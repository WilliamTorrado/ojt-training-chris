import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Subject, of } from "rxjs";
import { catchError, map, takeUntil } from "rxjs/operators";
import { PublicApiService } from "../services/public-api.service";
import { SharedDataService, StudentProfile } from "../services/shared-data.service";

interface ProfileFieldConfig {
  controlName: "fullName" | "cpNumber" | "assignedOffice" | "jobDescription";
  placeholder: string;
  requiredMessage: string;
  whitespaceMessage: string;
  type: "text" | "textarea";
}

@Component({
  selector: "app-settings",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.css"]
})
export class SettingsComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;

  profileFields: ProfileFieldConfig[] = [
    {
      controlName: "fullName",
      placeholder: "Full Name",
      requiredMessage: "Full Name is required.",
      whitespaceMessage: "Full Name cannot be spaces only.",
      type: "text"
    },
    {
      controlName: "cpNumber",
      placeholder: "CP Number",
      requiredMessage: "CP Number is required.",
      whitespaceMessage: "CP Number cannot be spaces only.",
      type: "text"
    },
    {
      controlName: "assignedOffice",
      placeholder: "Assigned Office",
      requiredMessage: "Assigned Office is required.",
      whitespaceMessage: "Assigned Office cannot be spaces only.",
      type: "text"
    },
    {
      controlName: "jobDescription",
      placeholder: "Job Description",
      requiredMessage: "Job Description is required.",
      whitespaceMessage: "Job Description cannot be spaces only.",
      type: "textarea"
    }
  ];

  provinces: string[] = [];
  townsCities: string[] = [];
  barangays: string[] = [];
  errorMessage = "";
  successMessage = "";
  loadedProvincesCount = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private publicApiService: PublicApiService,
    private sharedDataService: SharedDataService
  ) {
    this.profileForm = this.formBuilder.group({
      fullName: ["", [Validators.required, this.noWhitespaceValidator]],
      cpNumber: ["", [Validators.required, this.noWhitespaceValidator]],
      assignedOffice: ["", [Validators.required, this.noWhitespaceValidator]],
      jobDescription: ["", [Validators.required, this.noWhitespaceValidator]],
      province: ["", [Validators.required]],
      townCity: [{ value: "", disabled: true }, [Validators.required]],
      barangay: [{ value: "", disabled: true }, [Validators.required]],
      profilePicture: [""]
    });
  }

  ngOnInit(): void {
    const profile = this.sharedDataService.getStudentProfile();
    this.profileForm.patchValue(profile, { emitEvent: false });

    this.loadProvinces();
    this.setupAddressFieldBehavior();

    if (profile.province) {
      const townCityControl = this.profileForm.get("townCity");
      if (townCityControl) {
        townCityControl.enable({ emitEvent: false });
      }
      this.loadTownsCities(profile.province);
    }

    if (profile.province && profile.townCity) {
      const barangayControl = this.profileForm.get("barangay");
      if (barangayControl) {
        barangayControl.enable({ emitEvent: false });
      }
      this.loadBarangays(profile.province, profile.townCity);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get profilePicturePreview(): string {
    const profilePictureControl = this.profileForm.get("profilePicture");
    return (profilePictureControl ? profilePictureControl.value : "") || "";
  }

  saveSettings(): void {
    this.clearMessages();

    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.errorMessage = "Please complete all required fields.";
      return;
    }

    const payload = this.normalizeProfile(this.profileForm.getRawValue() as StudentProfile);
    this.profileForm.patchValue(payload, { emitEvent: false });

    this.publicApiService
      .saveSettings(payload)
      .pipe(
        catchError(() => {
          this.persistProfileLocally(payload);
          this.successMessage = "Profile saved locally (API unavailable).";
          return of(payload);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.persistProfileLocally(payload);
        this.successMessage = "Student profile saved.";
      });
  }

  onProfilePictureSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files.length ? input.files[0] : null;

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      this.errorMessage = "Please upload a valid image file.";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const profilePictureControl = this.profileForm.get("profilePicture");
      if (profilePictureControl) {
        profilePictureControl.setValue(String(reader.result || ""));
      }
    };
    reader.readAsDataURL(file);
  }

  showError(controlName: string, errorKey: string): boolean {
    const control = this.profileForm.get(controlName);
    return !!control && control.hasError(errorKey) && (control.touched || control.dirty);
  }

  private setupAddressFieldBehavior(): void {
    const provinceControl = this.profileForm.get("province");
    if (provinceControl) {
      provinceControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((province: string) => {
        const townCityControl = this.profileForm.get("townCity");
        const barangayControl = this.profileForm.get("barangay");

        this.townsCities = [];
        this.barangays = [];

        if (townCityControl) {
          townCityControl.setValue("");
          townCityControl.disable({ emitEvent: false });
        }

        if (barangayControl) {
          barangayControl.setValue("");
          barangayControl.disable({ emitEvent: false });
        }

        if (!province) {
          return;
        }

        if (townCityControl) {
          townCityControl.enable({ emitEvent: false });
        }
        this.loadTownsCities(province);
      });
    }

    const townCityControl = this.profileForm.get("townCity");
    if (townCityControl) {
      townCityControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((townCity: string) => {
        const provinceControlRef = this.profileForm.get("province");
        const province = provinceControlRef ? provinceControlRef.value : "";
        const barangayControl = this.profileForm.get("barangay");

        this.barangays = [];
        if (barangayControl) {
          barangayControl.setValue("");
          barangayControl.disable({ emitEvent: false });
        }

        if (!province || !townCity) {
          return;
        }

        if (barangayControl) {
          barangayControl.enable({ emitEvent: false });
        }
        this.loadBarangays(province, townCity);
      });
    }
  }

  private loadProvinces(): void {
    this.publicApiService
      .getProvinces()
      .pipe(
        map((items) =>
          this.mapToDisplayList(items, ["province", "Province", "provinceName", "ProvinceName", "name", "Name"])
        ),
        catchError(() => {
          this.errorMessage = "Failed to load provinces from API.";
          return of([]);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((items) => {
        this.provinces = items;
        this.loadedProvincesCount = items.length;
      });
  }

  private loadTownsCities(province: string): void {
    this.publicApiService
      .getTownsCities(province)
      .pipe(
        map((items) =>
          this.mapToDisplayList(items, [
            "townCity",
            "TownCity",
            "townOrCity",
            "TownOrCity",
            "townCityName",
            "TownOrCityName",
            "name",
            "Name"
          ])
        ),
        catchError(() => {
          this.errorMessage = "Failed to load towns/cities from API.";
          return of([]);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((items) => {
        this.townsCities = items;
      });
  }

  private loadBarangays(province: string, townCity: string): void {
    this.publicApiService
      .getBarangays(province, townCity)
      .pipe(
        map((items) =>
          this.mapToDisplayList(items, ["barangay", "Barangay", "barangayName", "BarangayName", "name", "Name"])
        ),
        catchError(() => {
          this.errorMessage = "Failed to load barangays from API.";
          return of([]);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((items) => {
        this.barangays = items;
      });
  }

  private mapToDisplayList(items: any[], candidateKeys: string[]): string[] {
    const values = (items || [])
      .map((item) => this.readFirstAvailable(item, candidateKeys) || this.readFallbackString(item))
      .filter((value) => !!value);

    return Array.from(new Set(values));
  }

  private readFirstAvailable(item: any, keys: string[]): string {
    if (!item) {
      return "";
    }

    for (let i = 0; i < keys.length; i++) {
      const value = item[keys[i]];
      if (value !== undefined && value !== null && String(value).trim() !== "") {
        return String(value).trim();
      }
    }

    return "";
  }

  private readFallbackString(item: any): string {
    if (!item || typeof item !== "object") {
      return "";
    }

    const keys = Object.keys(item);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key.toLowerCase() === "psgc") {
        continue;
      }

      const value = item[key];
      if (typeof value === "string" && value.trim() !== "") {
        return value.trim();
      }
    }

    return "";
  }

  private normalizeProfile(profile: StudentProfile): StudentProfile {
    return {
      fullName: (profile.fullName || "").trim(),
      cpNumber: (profile.cpNumber || "").trim(),
      assignedOffice: (profile.assignedOffice || "").trim(),
      jobDescription: (profile.jobDescription || "").trim(),
      province: (profile.province || "").trim(),
      townCity: (profile.townCity || "").trim(),
      barangay: (profile.barangay || "").trim(),
      profilePicture: profile.profilePicture || ""
    };
  }

  private noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const value = (control.value || "").toString();
    return value.trim().length > 0 ? null : { whitespace: true };
  }

  private persistProfileLocally(profile: StudentProfile): void {
    this.sharedDataService.setStudentProfile(profile);
  }

  private clearMessages(): void {
    this.errorMessage = "";
    this.successMessage = "";
  }
}
