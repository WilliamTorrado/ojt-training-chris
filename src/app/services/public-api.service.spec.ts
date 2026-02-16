import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProvinces(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/PublicAPI/Provines`
    );
  }

  getTownsCities(province: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/PublicAPI/TownsCities/${province}`
    );
  }

  getBarangays(province: string, townCity: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/PublicAPI/Barangays/${province}/${townCity}`
    );
  }
}