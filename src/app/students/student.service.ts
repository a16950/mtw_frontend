import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ServiceHelpers } from '../service-helpers';
import { Course } from '../courses/course';
import { EvaluationComponent } from '../courses/evaluation-components/evaluation-component';
import { Student } from './student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = 'http://localhost:3000/evaluation-components';
  private studentPath = 'students';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private serviceHelpers: ServiceHelpers
  ) {}

  getStudents(evaluation: EvaluationComponent): Observable<Student[]> {
    const url = this.buildStudentUrl(evaluation);
    return this.http
      .get<Student[]>(url)
      .pipe(
        catchError(
          this.serviceHelpers.handleError<Student[]>(
            'getStudents', [])
        )
      );
  }

  buildStudentUrl(evaluation: EvaluationComponent) {
    return `${this.baseUrl}/${evaluation._id}/${this.studentPath}`;
  }

  addStudent(evaluation: EvaluationComponent): Observable<Student> {
    return this.http
      .post<Student>(
        this.buildStudentUrl(evaluation),
        evaluation,
        this.httpOptions
      )
      .pipe(catchError(this.serviceHelpers.handleError<Student>('addStudent')));
  }

  deleteStudent(
    id: number,
    evaluationComponent: EvaluationComponent
  ): Observable<Student> {
    const ur = this.buildStudentUrl(evaluationComponent);
    const url = `${ur}/${id}`;

    return this.http.delete<Student>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted evaluation component id=${id}`)),
      catchError(this.serviceHelpers.handleError<Student>('deleteStudent'))
    );
  }

  updateStudent(evaluation: EvaluationComponent): Observable<any> {
    const ur = this.buildStudentUrl(evaluation);
    const url = `${ur}/${evaluation._id}`;

    return this.http.put(url, evaluation, this.httpOptions).pipe(
      tap((_) => console.log(`updated evaluation id=${evaluation._id}`)),
      catchError(this.serviceHelpers.handleError<any>('updateStudent'))
    );
  }

  getStudent(id: number, evaluation: EvaluationComponent): Observable<Student> {
    const url = `${this.buildStudentUrl(evaluation)}/${id}`;
    return this.http
      .get<Student>(url)
      .pipe(
        catchError(
          this.serviceHelpers.handleError<Student>(`getStudent id=${id}`)
        )
      );
  }
}
