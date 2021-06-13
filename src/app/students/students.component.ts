import { Component, OnInit, Input } from '@angular/core';
import { Student } from './student';
import { Course } from '../courses/course';
import { StudentService } from './student.service';
import { EvaluationComponent } from '../courses/evaluation-components/evaluation-component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];

  @Input() evaluationComponent?: EvaluationComponent;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.evaluationComponent = history.state;
    this.getStudents();
  }

  getStudents(): void {
    if (this.evaluationComponent)
      this.studentService
        .getStudents(this.evaluationComponent)
        .subscribe((response) => (this.students = response));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.studentService.addStudent({ name } as Student).subscribe((student) => {
      this.students.push(student);
    });
  }

  delete(student: Student): void {
    if (this.evaluationComponent) {
      this.students = this.students.filter((c) => c !== student);
      this.studentService
        .deleteStudent(student._id, this.evaluationComponent)
        .subscribe();
    }
  }
}
