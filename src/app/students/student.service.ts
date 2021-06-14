import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ServiceHelpers } from '../criteria/service-helpers';
import { Course } from '../courses/course';
import { EvaluationComponent } from '../courses/evaluation-components/evaluation-component';
import { Student } from './student';
import { StudentsComponent } from './students.component';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = 'http://localhost:3000/courses';
  private studentPath = 'students';
  private evaluationPath = 'evaluation-components';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private serviceHelpers: ServiceHelpers
  ) {}

  getStudents(course:Course, evaluationcomponent: EvaluationComponent): Observable<Student[]> {
    const url = this.buildStudentUrl(course, evaluationcomponent);
    return this.http
      .get<Student[]>(url)
      .pipe(
        catchError(
          this.serviceHelpers.handleError<Student[]>(
            'getStudents',
            []
          )
        )
      );
  }

  buildStudentUrl(course:Course, evaluation: EvaluationComponent) {
    const url = `${this.baseUrl}/${course._id}/${this.evaluationPath}/${evaluation._id}/${this.studentPath}`;
    console.log(url);
    return `${this.baseUrl}/${course._id}/${this.evaluationPath}/${evaluation._id}/${this.studentPath}`;
  }


  addStudent(course:Course, evaluation: EvaluationComponent, student: Student): Observable<Student> {
    student.evaluationComponent = evaluation._id;
    return this.http
      .post<Student>(
        this.buildStudentUrl(course, evaluation),
        student,
        this.httpOptions
      )
      .pipe(catchError(this.serviceHelpers.handleError<Student>('addStudent')));
  }



  deleteStudent(id: number, evaluationComponent: EvaluationComponent, course:Course): Observable<Student> {
    console.log(id);
    const ur = this.buildStudentUrl(course, evaluationComponent);
    const url = `${ur}/${id}`;

    return this.http.delete<Student>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted evaluation component id=${id}`)),
      catchError(this.serviceHelpers.handleError<Student>('deleteStudent'))
    );
  }

  updateStudent(course:Course, evaluation: EvaluationComponent, student: Student): Observable<any> {
    const ur = this.buildStudentUrl(course, evaluation);
    const url = `${ur}/${student._id}`;

    return this.http.put(url, student, this.httpOptions).pipe(
      tap((_) => console.log(`updated student id=${student._id}`)),
      catchError(this.serviceHelpers.handleError<any>('updateStudent'))
    );
  }

  getStudent(id: number, evaluation: EvaluationComponent, course:Course): Observable<Student> {
    const url = `${this.buildStudentUrl(course,evaluation)}/${id}`;
    return this.http
      .get<Student>(url)
      .pipe(
        catchError(
          this.serviceHelpers.handleError<Student>(`getStudent id=${id}`)
        )
      );
  }
}
