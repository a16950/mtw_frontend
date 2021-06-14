import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ServiceHelpers } from '../criteria/service-helpers';
import { Course } from '../courses/course';
import { EvaluationComponent } from '../courses/evaluation-components/evaluation-component';
import { Criteria } from './criteria';

@Injectable({
  providedIn: 'root'
})
export class CriteriaService {
  private baseUrl = 'http://localhost:3000/courses';
  private criteriaPath = 'criterias';
  private evaluationPath = 'evaluation-components';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private serviceHelpers: ServiceHelpers
  ) {}

  getCriterias(course:Course, evaluationcomponent: EvaluationComponent): Observable<Criteria[]> {
    const url = this.buildCriteriaUrl(course, evaluationcomponent);
    return this.http
      .get<Criteria[]>(url)
      .pipe(
        catchError(
          this.serviceHelpers.handleError<Criteria[]>(
            'getCriterias',
            []
          )
        )
      );
  }

  buildCriteriaUrl(course:Course, evaluation: EvaluationComponent) {
    const url = `${this.baseUrl}/${course._id}/${this.evaluationPath}/${evaluation._id}/${this.criteriaPath}`;
    console.log(url);
    return `${this.baseUrl}/${course._id}/${this.evaluationPath}/${evaluation._id}/${this.criteriaPath}`;
  }

  addCriteria(course:Course, evaluation: EvaluationComponent, criteria: Criteria): Observable<Criteria> {
    criteria.evaluationComponent = evaluation._id;
    return this.http
      .post<Criteria>(
        this.buildCriteriaUrl(course, evaluation),
        criteria,
        this.httpOptions
      )
      .pipe(catchError(this.serviceHelpers.handleError<Criteria>('addCriteria')));
  }

  deleteCriteria(id: number, evaluationComponent: EvaluationComponent, course:Course): Observable<Criteria> {
    const ur = this.buildCriteriaUrl(course, evaluationComponent);
    const url = `${ur}/${id}`;

    return this.http.delete<Criteria>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted criteria component id=${id}`)),
      catchError(this.serviceHelpers.handleError<Criteria>('deleteCriteria'))
    );
  }

  updateCriteria(course:Course, evaluation: EvaluationComponent, criteria: Criteria): Observable<any> {
    const ur = this.buildCriteriaUrl(course, evaluation);
    const url = `${ur}/${criteria._id}`;

    return this.http.put(url, criteria, this.httpOptions).pipe(
      tap((_) => console.log(`updated criteria id=${criteria._id}`)),
      catchError(this.serviceHelpers.handleError<any>('updateCriteria'))
    );
  }


}
