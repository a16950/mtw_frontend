import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ServiceHelpers } from '../criteria/service-helpers';
import { Student } from '../students/student';
import { EvaluationComponent } from '../courses/evaluation-components/evaluation-component';
import { Grade } from './grade';
import { Criteria } from '../criteria/criteria';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private baseUrl = 'http://localhost:3000/courses';
  private gradePath = 'grades';
  private evaluationPath = 'evaluation-components';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private serviceHelpers: ServiceHelpers
  ) {}

  getGrades(criteria: Criteria, student: Student): Observable<Grade[]> {
    const url = this.buildGradeUrl(criteria, student);
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

  buildGradeUrl(criteria:Criteria, student:Student) {
    const url = `${this.baseUrl}/${student._id}/${this.gradePath}`;
    console.log(url);
    return `${this.baseUrl}/${student._id}/${this.gradePath}`;
  }

  addGrade(criteria: Criteria, student: Student, grade: Grade): Observable<Grade> {
    grade.student = student._id;
    return this.http
      .post<Grade>(
        this.buildGradeUrl(criteria, student),
        grade,
        this.httpOptions
      )
      .pipe(catchError(this.serviceHelpers.handleError<Grade>('addGrade')));
  }



  deleteGrade(id: number, criteria: Criteria, student: Student): Observable<Grade> {
    console.log(id);
    const ur = this.buildGradeUrl(criteria, student);
    const url = `${ur}/${id}`;

    return this.http.delete<Grade>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted evaluation component id=${id}`)),
      catchError(this.serviceHelpers.handleError<Grade>('deleteGrade'))
    );
  }

  updateGrade(criteria: Criteria, student: Student, grade: Grade): Observable<any> {
    const ur = this.buildGradeUrl(criteria, student);
    const url = `${ur}/${grade._id}`;

    return this.http.put(url, grade, this.httpOptions).pipe(
      tap((_) => console.log(`updated grade id=${grade._id}`)),
      catchError(this.serviceHelpers.handleError<any>('updateGrade'))
    );
  }

  getGrade(id: number, criteria: Criteria, student: Student): Observable<Grade> {
    const url = `${this.buildGradeUrl(criteria, student)}/${id}`;
    return this.http
      .get<Grade>(url)
      .pipe(
        catchError(
          this.serviceHelpers.handleError<Grade>(`getGrade id=${id}`)
        )
      );
  }
}