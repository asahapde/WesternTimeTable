import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { Review } from './Review';

import {catchError} from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  reviewURL: string = 'http://localhost:3000/api/secure/reviews/';

  constructor(private http : HttpClient) { }

  getAllReviews():Observable<Review[]> {
    return this.http.get<Review[]>(this.reviewURL);

  }

  getReviews():Observable<Review[]> {
    return this.http.get<Review[]>('http://localhost:3000/api/open/reviews/')
    .pipe(
      catchError(this.handleError)
    )
  }

  createReview(newName: string): Observable<Review> {
    newName = newName.replace(/<[^>]*>/g, '');


    return this.http.post<Review>('http://localhost:3000/api/schedules', { name: newName })
      .pipe(
        catchError(this.handleError)
      )
  }

  handleError(error){
    return throwError(error);
    
  }
}
