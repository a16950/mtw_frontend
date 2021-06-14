import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../students/student';
import { EvaluationComponent } from '../students/evaluation-components/evaluation-component';
import { GradeService } from './grades.service';
import { Grade } from './grade';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css'],
})
export class GradesComponent implements OnInit {
  grades: Grade[] = [];

  @Input() criteria?: EvaluationComponent;
  @Input() student?: Course;


  constructor(private gradeService: GradeService) {}

  ngOnInit(): void {
    this.criteria = history.state.criteria;
    this.student = history.state.student;
    this.getGrades();
  }

  getGrades(): void {
    if (this.criteria && this.student) {
      this.gradeService
        .getGrades(this.student, this.criteria)
        .subscribe((response) => this.grades = response);
    }
  }

  add(grade: number): void {if (!grade) { return; }
    if (this.criteria && this.student)
    {
    this.gradeService.addGrade(this.student, this.criteria, {grade} as Grade)
      .subscribe(grade => {
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
