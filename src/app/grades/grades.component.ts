import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../students/student';
import { EvaluationComponent } from '../courses/evaluation-components/evaluation-component';
import { GradeService } from './grades.service';
import { Grade } from './grade';
import { Criteria } from '../criteria/criteria';
import { Course } from '../courses/course';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css'],
})
export class GradesComponent implements OnInit {
  grades: Grade[] = [];

  @Input() criteria?: Criteria;
  @Input() student?: Student;
  @Input() evaluationComponent?: EvaluationComponent;
  @Input() course?: Course;

  constructor(private gradeService: GradeService) {}

  ngOnInit(): void {
    this.criteria = history.state.criteria;
    this.student = history.state.student;
    this.evaluationComponent = history.state.evaluationComponent;
    this.course = history.state.course;
    console.log(this.evaluationComponent);
    console.log(this.course);
    this.getGrades();
  }

  getGrades(): void {
    if (this.criteria && this.student) {
      this.gradeService
        .getGrades(this.criteria, this.student)
        .subscribe((response) => (this.grades = response));
    }
  }

  add(number: string): void {
    if (!number) {
      return;
    }
    var grade: number;
    grade = parseFloat(number);
    if (this.criteria && this.student) {
      this.gradeService
        .addGrade(this.criteria, this.student, { grade } as Grade)
        .subscribe((grade) => {
          this.grades.push(grade);
        });
    }
  }

  delete(grade: Grade): void {
    if (this.criteria && this.student) {
      this.grades = this.grades.filter((c) => c !== grade);
      this.gradeService
        .deleteGrade(grade._id, this.criteria, this.student)
        .subscribe();
    }
  }
}
