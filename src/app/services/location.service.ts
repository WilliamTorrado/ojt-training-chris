import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Province, TownCity, Barangay } from '../shared/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getProvinces(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/PublicAPI/Provinces`)
      .pipe(catchError(this.handleError));
  }

  getTownCities(province: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/PublicAPI/TownsCities/${province}`)
      .pipe(catchError(this.handleError));
  }

  getBarangays(province: string, townCity: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/PublicAPI/Barangays/${province}/${townCity}`)
      .pipe(catchError(this.handleError));
  }

  saveDeployment(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/PublicAPI/SaveDeployment`, payload)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let msg = 'An error occurred.';
    if (error.status === 404) msg = 'Resource not found.';
    if (error.status === 500) msg = 'Server error.';
    return throwError(msg);
  }
  
}
