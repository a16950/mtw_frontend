import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../courses/course';
import { EvaluationComponent } from '../courses/evaluation-components/evaluation-component';
import { StudentService } from './student.service';
import { Student } from './student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];

  @Input() evaluationComponent?: EvaluationComponent;
  @Input() course?: Course;


  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.evaluationComponent = history.state.evaluationComponent;
    this.course = history.state.course;
    this.getStudents();
  }

  getStudents(): void {
    if (this.evaluationComponent) {
      this.studentService
        .getStudents(this.evaluationComponent)
        .subscribe((response) => this.students = response);
    }
  }

  add(name: string): void {name = name.trim(); if (!name) { return; }
    if (this.evaluationComponent)
    {
    this.studentService.addStudent(this.evaluationComponent, { name } as Student)
      .subscribe(student => {
        this.students.push(student);
      });
    }
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
