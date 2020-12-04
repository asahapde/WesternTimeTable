import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { Course } from './Course';

import {catchError} from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseURL: string = 'http://localhost:3000/api/open/courses';

  constructor(private http : HttpClient) { }

  getCourses():Observable<Course[]> {
    return this.http.get<Course[]>(this.courseURL);

  }

  getSearch(url : string):Observable<Course[]> {
    return this.http.get<Course[]>(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  handleError(error){
    return throwError(error);
    
  }
}
