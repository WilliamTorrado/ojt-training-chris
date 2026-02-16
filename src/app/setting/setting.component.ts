import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subject, of } from "rxjs";
import { catchError, map, takeUntil } from "rxjs/operators";
import { PublicApiService } from "../services/public-api.service";
import { SharedDataService, StudentProfile } from "../services/shared-data.service";

@Component({
  selector: "app-settings",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.css"]
})
export class SettingsComponent implements OnInit, OnDestroy {
  user: StudentProfile = {
    fullName: "",
    cpNumber: "",
    assignedOffice: "",
    jobDescription: "",
    province: "",
    townCity: "",
    barangay: "",
    profilePicture: ""
  };

  provinces: string[] = [];
  townsCities: string[] = [];
  barangays: string[] = [];
  errorMessage = "";
  successMessage = "";
  loadedProvincesCount = 0;

  private destroy$ = new Subject<void>();

  constructor(private publicApiService: PublicApiService, private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.user = this.sharedDataService.getStudentProfile();
    this.loadProvinces();

    if (this.user.province) {
      this.loadTownsCities(this.user.province);
    }

    if (this.user.province && this.user.townCity) {
      this.loadBarangays(this.user.province, this.user.townCity);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onProvinceChange(): void {
    this.user.townCity = "";
    this.user.barangay = "";
    this.townsCities = [];
    this.barangays = [];

    if (!this.user.province) {
      return;
    }

    this.loadTownsCities(this.user.province);
  }

  onTownChange(): void {
    this.user.barangay = "";
    this.barangays = [];

    if (!this.user.province || !this.user.townCity) {
      return;
    }

    this.loadBarangays(this.user.province, this.user.townCity);
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
      this.user.profilePicture = String(reader.result || "");
    };
    reader.readAsDataURL(file);
  }

  saveSettings(form: NgForm): void {
    this.clearMessages();

    if (form.invalid) {
      this.errorMessage = "Please complete all required fields.";
      return;
    }

    const payload = { ...this.user };

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
        map((items) => this.mapToDisplayList(items, ["barangay", "Barangay", "barangayName", "BarangayName", "name", "Name"])),
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

  private persistProfileLocally(profile: StudentProfile): void {
    this.sharedDataService.setStudentProfile(profile);
  }

  private clearMessages(): void {
    this.errorMessage = "";
    this.successMessage = "";
  }
}
