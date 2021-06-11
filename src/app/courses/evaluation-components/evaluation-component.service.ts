import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ServiceHelpers } from '../../service-helpers';
import { EvaluationComponent } from './evaluation-component'
import { Course } from '../../courses/course';

@Injectable({
  providedIn: 'root'
})
export class EvaluationComponentService {
  private baseUrl = 'http://localhost:3000/courses';
  private evaluationPath = 'evaluation-components';
 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient, private serviceHelpers: ServiceHelpers) { }
  
    getEvaluationComponents(course: Course): Observable<EvaluationComponent[]> {
      const url = this.buildEvaluationUrl(course);
      return this.http.get<EvaluationComponent[]>(url)
        .pipe(
          catchError(this.serviceHelpers.handleError<EvaluationComponent[]>('getEvaluationComponents', []))
        );
    }

    buildEvaluationUrl(course: Course) {
      return `${this.baseUrl}/${course._id}/${this.evaluationPath}`; 
    }
  }