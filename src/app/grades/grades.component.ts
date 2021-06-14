import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../students/student';
import { Criteria } from '../criteria/criteria';
import { Grade } from './grade';
import { GradesService } from './grades.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  grades: Grade[] = [];

  @Input() student?: Student;
  @Input() criteria?: Criteria;

  constructor(private gradeService: GradesService) {}

  ngOnInit(): void {
    this.student = history.state.student;
    this.criteria = history.state.criteria;
    this.getGrades();
  }

  getGrades(): void {
    if (this.student && this.criteria) {
      this.gradeService
        .getStudents(this.student, this.criteria)
        .subscribe((response) => this.grades = response);
    }
  }

  add(name: string): void {name = name.trim(); if (!name) { return; }
    if (this.evaluationComponent && this.course)
    {
    this.studentService.addStudent(this.course, this.evaluationComponent, {name} as Student)
      .subscribe(student => {
        this.students.push(student);
      });
    }
  }

  delete(student: Student): void {
    if (this.evaluationComponent && this.course) {
      this.students = this.students.filter((c) => c !== student);
      this.studentService
        .deleteStudent(student._id, this.evaluationComponent, this.course)
        .subscribe();
    }
  }
}


}
