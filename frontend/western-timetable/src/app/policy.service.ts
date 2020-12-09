import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'
import { Policy } from './Policy';


@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  header = new HttpHeaders({
    'Authorization': 'Bearer ' + this.authService.getToken()
  });

  handleError(errorResponse: HttpErrorResponse) {
    console.log(JSON.stringify(errorResponse.error.text))
    return throwError(errorResponse);

  }

  getPolicy(): Observable<Policy[]> {
    return this.http.get<Policy[]>('/api/open/policy', { headers: this.header })
      .pipe(
        catchError(this.handleError)
      )
  }

  createPolicy(newPolicy): Observable<Policy> {
    return this.http.post<Policy>('/api/admin/policy', newPolicy, { headers: this.header })
      .pipe(
        catchError(this.handleError)
      )
  }

  editPolicy(policy): Observable<void> {
    const url = `/api/admin/policy/${policy._id}`;

    return this.http.put<void>(url, policy, { headers: this.header })
      .pipe(
        catchError(this.handleError)
      )
  }
}
