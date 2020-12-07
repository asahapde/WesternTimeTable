import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { Log } from './Log';
import { AuthService } from './auth.service'


import {catchError} from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http : HttpClient, private authService: AuthService) { }

  handleError(error){
    return throwError(error);
    
  }

  getLogs():Observable<Log[]> {
    const header = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.getToken()
    });
    return this.http.get<Log[]>('http://localhost:3000/api/admin/logs', { headers: header })
    .pipe(
      catchError(this.handleError)
    )

  }

  createLog(logInfo): Observable<Log> {
    const header = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.getToken()
    });

    return this.http.post<Log>('http://localhost:3000/api/admin/logs', logInfo, { headers: header })
      .pipe(
        catchError(this.handleError)
      )
  }
}
