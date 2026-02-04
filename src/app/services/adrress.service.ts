import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdrressService {
  private baseUrl = 'https://apidev.usl.edu.ph';
  
  constructor(private http: HttpClient) { }

  // GET provinces
  getProvinces(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/PublicAPI/Provinces`)
      .pipe(catchError(this.handleError));
  }

  // GET cities
  getTownsCities(province: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/PublicAPI/TownsCities/${province}`)
      .pipe(catchError(this.handleError));
  }

  // GET barangays
  getBarangays(province: string, townCity: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/PublicAPI/Barangays/${province}/${townCity}`)
      .pipe(catchError(this.handleError));
  }

  saveUserAddress(addressData: any): Observable<any> {
  const url = `${this.baseUrl}/api/PublicAPI/SaveAddress`; 
  
  return this.http.post<any>(url, addressData)
    .pipe(
      catchError(this.handleError) 
    );
}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred while fetching address data.';
    if (error.status === 404) errorMessage = 'The requested address resource was not found.';
    if (error.status === 500) errorMessage = 'Internal Server Error. Please try again later.';
    
    console.error(error);
    return throwError(() => new Error(errorMessage));
  }
}
