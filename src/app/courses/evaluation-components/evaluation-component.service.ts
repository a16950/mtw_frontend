import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ServiceHelpers } from '../../service-helpers';
import { EvaluationComponent } from './evaluation-component';
import { Course } from '../../courses/course';

@Injectable({
  providedIn: 'root',
})
export class EvaluationComponentService {
  private baseUrl = 'http://localhost:3000/courses';
  private evaluationPath = 'evaluation-components';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private serviceHelpers: ServiceHelpers
  ) {}

  getEvaluationComponents(course: Course): Observable<EvaluationComponent[]> {
    const url = this.buildEvaluationUrl(course);
    return this.http
      .get<EvaluationComponent[]>(url)
      .pipe(
        catchError(
          this.serviceHelpers.handleError<EvaluationComponent[]>(
            'getEvaluationComponents',
            []
          )
        )
      );
  }

  buildEvaluationUrl(course: Course) {
    return `${this.baseUrl}/${course._id}/${this.evaluationPath}`;
  }

  addEvaluation(course: Course, evaluation: EvaluationComponent): Observable<EvaluationComponent> {
    return this.http
      .post<EvaluationComponent>(
        this.buildEvaluationUrl(course),
        evaluation,
        this.httpOptions
      )
      .pipe(
        catchError(
          this.serviceHelpers.handleError<EvaluationComponent>('addEvaluation')
        )
      );
  }

  deleteEvaluation(
    id: number,
    course: Course
  ): Observable<EvaluationComponent> {
    const ur = this.buildEvaluationUrl(course);
    const url = `${ur}/${id}`;

    return this.http.delete<EvaluationComponent>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted evaluation component id=${id}`)),
      catchError(
        this.serviceHelpers.handleError<EvaluationComponent>(
          'deleteEvaluationComponent'
        )
      )
    );
  }

  updateEvaluation(
    evaluation: EvaluationComponent,
    course: Course
  ): Observable<any> {
    const ur = this.buildEvaluationUrl(course);
    const url = `${ur}/${evaluation._id}`;

    return this.http.put(url, evaluation, this.httpOptions).pipe(
      tap((_) => console.log(`updated evaluation id=${evaluation._id}`)),
      catchError(this.serviceHelpers.handleError<any>('updateEvaluation'))
    );
  }

  getEvaluation(id: number, course: Course): Observable<EvaluationComponent> {
    const url = `${this.buildEvaluationUrl(course)}/${id}`;
    return this.http
      .get<EvaluationComponent>(url)
      .pipe(
        catchError(
          this.serviceHelpers.handleError<EvaluationComponent>(
            `getEvaluation id=${id}`
          )
        )
      );
  }
}
