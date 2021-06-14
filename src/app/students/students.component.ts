import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../courses/course';
import { EvaluationComponent } from '../courses/evaluation-components/evaluation-component';
import { StudentService } from './student.service';
import { CriteriaService } from '../criteria/criteria.service';
import { Student } from './student';
import { Criteria } from '../criteria/criteria';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  criterias: Criteria[] = [];
  aux: number = 0;


  @Input() evaluationComponent?: EvaluationComponent;
  @Input() course?: Course;


  constructor(private studentService: StudentService,
    private criteriaService: CriteriaService) {}

  ngOnInit(): void {
    this.evaluationComponent = history.state.evaluationComponent;
    this.course = history.state.course;
    this.getStudents();
    this.getCriteria();

  }
  
  getStudents():void
  {
    if (this.evaluationComponent && this.course)
    {
      this.studentService
        .getStudents(this.course, this.evaluationComponent)
        .subscribe((response) => this.students = response);
    }
  }

  getCriteria():void
  {
    if (this.evaluationComponent && this.course)
    {
    this.criteriaService.getCriterias(this.course, this.evaluationComponent)
    .subscribe((response) => this.criterias = response);
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
