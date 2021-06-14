import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ServiceHelpers } from '../criteria/service-helpers';
import { Student } from '../students/student';
import { EvaluationComponent } from '../courses/evaluation-components/evaluation-component';
import { Grade } from './grade';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private baseUrl = 'http://localhost:3000/students';
  private gradePath = 'grades';
  private evaluationPath = 'evaluation-components';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private serviceHelpers: ServiceHelpers
  ) {}

  getGrades(student:Student, evaluationcomponent: EvaluationComponent): Observable<Grade[]> {
    const url = this.buildGradeUrl(student, evaluationcomponent);
    return this.http
      .get<Grade[]>(url)
      .pipe(
        catchError(
          this.serviceHelpers.handleError<Grade[]>(
            'getGrades',
            []
          )
        )
      );
  }

  buildGradeUrl(student:Student, evaluation: EvaluationComponent) {
    const url = `${this.baseUrl}/${student._id}/${this.evaluationPath}/${evaluation._id}/${this.gradePath}`;
    console.log(url);
    return `${this.baseUrl}/${student._id}/${this.evaluationPath}/${evaluation._id}/${this.gradePath}`;
  }

  addGrade(student:Student, evaluation: EvaluationComponent, grade: Grade): Observable<Grade> {
    grade.student = student._id;
    return this.http
      .post<Grade>(
        this.buildGradeUrl(student, evaluation),
        grade,
        this.httpOptions
      )
      .pipe(catchError(this.serviceHelpers.handleError<Grade>('addGrade')));
  }



  deleteGrade(id: number, evaluationComponent: EvaluationComponent, student:Student): Observable<Grade> {
    console.log(id);
    const ur = this.buildGradeUrl(student, evaluationComponent);
    const url = `${ur}/${id}`;

    return this.http.delete<Grade>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted evaluation component id=${id}`)),
      catchError(this.serviceHelpers.handleError<Grade>('deleteGrade'))
    );
  }

  updateGrade(student:Student, evaluation: EvaluationComponent, grade: Grade): Observable<any> {
    const ur = this.buildGradeUrl(student, evaluation);
    const url = `${ur}/${grade._id}`;

    return this.http.put(url, grade, this.httpOptions).pipe(
      tap((_) => console.log(`updated grade id=${grade._id}`)),
      catchError(this.serviceHelpers.handleError<any>('updateGrade'))
    );
  }

  getGrade(id: number, evaluation: EvaluationComponent, student:Student): Observable<Grade> {
    const url = `${this.buildGradeUrl(student,evaluation)}/${id}`;
    return this.http
      .get<Grade>(url)
      .pipe(
        catchError(
          this.serviceHelpers.handleError<Grade>(`getGrade id=${id}`)
        )
      );
  }
}
