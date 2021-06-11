import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../courses/course';
import { CourseService } from '../courses/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  @Input() course?: Course;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
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
