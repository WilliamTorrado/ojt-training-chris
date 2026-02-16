import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PublicApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProvinces(): Observable<any[]> {
    return this.getListWithFallback("/api/PublicAPI/Provinces");
  }

  getTownsCities(province: string): Observable<any[]> {
    return this.getListWithFallback("/api/PublicAPI/TownsCities/" + encodeURIComponent(province));
  }

  getBarangays(province: string, townCity: string): Observable<any[]> {
    return this.getListWithFallback(
      "/api/PublicAPI/Barangays/" + encodeURIComponent(province) + "/" + encodeURIComponent(townCity)
    );
  }

  saveSettings(payload: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/api/PublicAPI/Settings", payload).pipe(
      map((res) => {
        if (res && res.data) {
          return res.data;
        }
        return res || payload;
      }),
      catchError((err) => throwError(err))
    );
  }

  private getListWithFallback(path: string): Observable<any[]> {
    const primaryUrl = this.baseUrl + path;
    const fallbackUrl = this.baseUrl + "/sui-dev-page" + path;

    return this.getList(primaryUrl).pipe(
      catchError(() => this.getList(fallbackUrl))
    );
  }

  private getList(url: string): Observable<any[]> {
    return this.http.get(url, { responseType: "text" }).pipe(
      map((res) => this.normalizeListResponse(res)),
      catchError((err) => throwError(err))
    );
  }

  private normalizeListResponse(res: any): any[] {
    if (Array.isArray(res)) {
      return res;
    }

    if (typeof res === "string") {
      try {
        const parsed = JSON.parse(res);
        return this.normalizeListResponse(parsed);
      } catch {
        return [];
      }
    }

    if (res && Array.isArray(res.data)) {
      return res.data;
    }

    if (res && res.data && typeof res.data === "string") {
      try {
        const parsedData = JSON.parse(res.data);
        return this.normalizeListResponse(parsedData);
      } catch {
        return [];
      }
    }

    return [];
  }
}
