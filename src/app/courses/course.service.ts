import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Course } from './course';
import { ServiceHelpers } from '../service-helpers';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private coursesUrl = 'http://localhost:3000/courses';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient, private serviceHelpers: ServiceHelpers) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl)
      .pipe(
        tap(_ => console.log('fetched courses')),
        catchError(this.serviceHelpers.handleError<Course[]>('getCourses', []))
      );
  }

  getCourse(id: number): Observable<Course> {
    const url = `${this.coursesUrl}/${id}`;
    return this.http.get<Course>(url).pipe(
      tap(_ => console.log(`fetched course id=${id}`)),
      catchError(this.serviceHelpers.handleError<Course>(`getCourse id=${id}`))
    );
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.coursesUrl, course, this.httpOptions).pipe(
      tap((newCourse: Course) => console.log(`added course w/ id=${newCourse._id}`)),
      catchError(this.serviceHelpers.handleError<Course>('addCourse'))
    );
  }

  deleteCourse(id: number): Observable<Course> {
    const url = `${this.coursesUrl}/${id}`;

    return this.http.delete<Course>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted course id=${id}`)),
      catchError(this.serviceHelpers.handleError<Course>('deleteCourse'))
    );
  }

  updateCourse(course: Course): Observable<any> {
    const url = `${this.coursesUrl}/${course._id}`;

    return this.http.put(url, course, this.httpOptions).pipe(
      tap(_ => console.log(`updated course id=${course._id}`)),
      catchError(this.serviceHelpers.handleError<any>('updateCourse'))
    );
  }
}
