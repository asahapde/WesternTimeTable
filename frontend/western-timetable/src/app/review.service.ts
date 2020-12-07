import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { Review } from './Review';
import { AuthService } from './auth.service'

import {catchError} from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  reviewURL: string = 'http://localhost:3000/api/secure/reviews/';

  constructor(private http : HttpClient, private authService: AuthService) { }

  getAllReviews():Observable<Review[]> {
    const header = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.getToken()
    });
    return this.http.get<Review[]>('http://localhost:3000/api/admin/reviews/', { headers: header })
    .pipe(
      catchError(this.handleError)
    )

  }

  getReviews():Observable<Review[]> {
    return this.http.get<Review[]>('http://localhost:3000/api/open/reviews/')
    .pipe(
      catchError(this.handleError)
    )
  }

  createReview(data): Observable<Review> {
    const header = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.getToken()
    });
    return this.http.post<Review>('http://localhost:3000/api/secure/reviews/', data, { headers: header })
    .pipe(
      catchError(this.handleError)
    )
  }

  handleError(error){
    return throwError(error);
    
  }
}
