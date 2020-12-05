import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Schedule } from './Schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  handleError(errorResponse: HttpErrorResponse) {
    console.log(JSON.stringify(errorResponse.error.text))
    return throwError(errorResponse);

  }

  createSchedule(newName: string): Observable<Schedule> {
    newName = newName.replace(/<[^>]*>/g, '');


    return this.http.post<Schedule>('http://localhost:3000/api/schedules', { name: newName })
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteSchedule(deleteName: string): Observable<void> {
    const url = `http://localhost:3000/api/schedules/${deleteName}`;

    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      )
  }

  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>('http://localhost:3000/api/schedules')
      .pipe(
        catchError(this.handleError)
      )
  }

  editSchedule(editScheduleName: string, courseData: any[]): Observable<void> {
    const url = `http://localhost:3000/api/schedules/${editScheduleName}`;

    return this.http.put<void>(url, courseData)
      .pipe(
        catchError(this.handleError)
      )
  }
}