import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../courses/course';
import { CourseService } from '../courses/course.service';
import { Routes } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})

export class CourseDetailComponent implements OnInit {
  @Input() course?: Course;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.course = history.state;
  }

  save(): void {
    if (this.course) {
      this.courseService.updateCourse(this.course)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
  }
}
