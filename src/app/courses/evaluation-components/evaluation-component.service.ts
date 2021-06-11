import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ServiceHelpers } from '../../service-helpers';
import { EvaluationComponent } from './evaluation-component'

@Injectable({
  providedIn: 'root'
})
export class EvaluationComponentService {
  private baseUrl = 'http://localhost:3000/courses';
 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient, private serviceHelpers: ServiceHelpers) { }
  
    getEvaluationComponents(): Observable<EvaluationComponent[]> {
      return this.http.get<EvaluationComponent[]>(this.baseUrl)
        .pipe(
          catchError(this.serviceHelpers.handleError<EvaluationComponent[]>('getEvaluationComponents', []))
        );
    }
  }