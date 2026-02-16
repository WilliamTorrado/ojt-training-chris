import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface StudentProfile {
  fullName: string;
  cpNumber: string;
  assignedOffice: string;
  jobDescription: string;
  province: string;
  townCity: string;
  barangay: string;
  profilePicture: string;
}

@Injectable({
  providedIn: "root"
})
export class SharedDataService {
  private readonly profileBaseKey = "studentProfile";
  private readonly internNameBaseKey = "internName";

  private internNameSubject = new BehaviorSubject<string>(this.readInternNameFromStorage());
  private studentProfileSubject = new BehaviorSubject<StudentProfile>(this.readProfileFromStorage());

  internName$ = this.internNameSubject.asObservable();
  studentProfile$ = this.studentProfileSubject.asObservable();

  setInternName(name: string): void {
    const value = (name || "").trim() || "WELCOME INTERN";
    localStorage.setItem(this.getScopedKey(this.internNameBaseKey), value);
    this.internNameSubject.next(value);
  }

  setStudentProfile(profile: StudentProfile): void {
    localStorage.setItem(this.getScopedKey(this.profileBaseKey), JSON.stringify(profile));
    this.studentProfileSubject.next(profile);
    this.setInternName(profile.fullName);
  }

  getStudentProfile(): StudentProfile {
    return this.studentProfileSubject.getValue();
  }

  refreshForCurrentUser(): void {
    this.internNameSubject.next(this.readInternNameFromStorage());
    this.studentProfileSubject.next(this.readProfileFromStorage());
  }

  private readInternNameFromStorage(): string {
    return localStorage.getItem(this.getScopedKey(this.internNameBaseKey)) || "WELCOME INTERN";
  }

  private readProfileFromStorage(): StudentProfile {
    const raw = localStorage.getItem(this.getScopedKey(this.profileBaseKey));
    if (!raw) {
      return this.emptyProfile();
    }

    try {
      const parsed = JSON.parse(raw);
      return {
        fullName: parsed.fullName || "",
        cpNumber: parsed.cpNumber || "",
        assignedOffice: parsed.assignedOffice || "",
        jobDescription: parsed.jobDescription || "",
        province: parsed.province || "",
        townCity: parsed.townCity || "",
        barangay: parsed.barangay || "",
        profilePicture: parsed.profilePicture || ""
      };
    } catch {
      return this.emptyProfile();
    }
  }

  private emptyProfile(): StudentProfile {
    return {
      fullName: "",
      cpNumber: "",
      assignedOffice: "",
      jobDescription: "",
      province: "",
      townCity: "",
      barangay: "",
      profilePicture: ""
    };
  }

  private getScopedKey(baseKey: string): string {
    const userId = localStorage.getItem("token");
    return userId ? baseKey + ":" + userId : baseKey;
  }
}
