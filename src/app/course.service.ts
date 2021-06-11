import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private coursesUrl = 'http://localhost:3000/courses';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl)
      .pipe(
        tap(_ => console.log('fetched courses')),
        catchError(this.handleError<Course[]>('getCourses', []))
      );
  }

  getCourse(id: number): Observable<Course> {
    const url = `${this.coursesUrl}/${id}`;
    return this.http.get<Course>(url).pipe(
      tap(_ => console.log(`fetched course id=${id}`)),
      catchError(this.handleError<Course>(`getCourse id=${id}`))
    );
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.coursesUrl, course, this.httpOptions).pipe(
      tap((newCourse: Course) => console.log(`added course w/ id=${newCourse._id}`)),
      catchError(this.handleError<Course>('addCourse'))
    );
  }

  deleteCourse(id: number): Observable<Course> {
    const url = `${this.coursesUrl}/${id}`;

    return this.http.delete<Course>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted course id=${id}`)),
      catchError(this.handleError<Course>('deleteCourse'))
    );
  }

  updateCourse(course: Course): Observable<any> {
    const url = `${this.coursesUrl}/${course._id}`;

    return this.http.put(url, course, this.httpOptions).pipe(
      tap(_ => console.log(`updated course id=${course._id}`)),
      catchError(this.handleError<any>('updateCourse'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
