import { Component, OnInit, Input } from '@angular/core';
import { EvaluationComponent } from '../courses/evaluation-components/evaluation-component';
import { Course } from '../courses/course';
import { Student } from '../students/student';
import { StudentService } from '../students/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  @Input() evaluation?:EvaluationComponent
  @Input() course?:Course
  @Input() student?:Student
  

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.evaluation = history.state.evaluation;
    this.course = history.state.course;
    this.student = history.state.student;
  }

  save(): void {
    if (this.evaluation && this.course && this.student) {
      this.studentService.updateStudent(this.course,this.evaluation,this.student)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
  }
}
