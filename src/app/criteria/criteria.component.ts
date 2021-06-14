import { Component, OnInit, Input } from '@angular/core';
import { Criteria } from './criteria';
import { EvaluationComponent } from '../courses/evaluation-components/evaluation-component';
import { Course } from '../courses/course';
import { CriteriaService } from './criteria.service';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {
  criterias: Criteria[] = [];

  @Input() evaluationComponent?: EvaluationComponent;
  @Input() course?: Course;


  constructor(private criteriaService: CriteriaService) {}

  ngOnInit(): void {
    this.evaluationComponent = history.state.evaluationComponent;
    this.course = history.state.course;
    this.getCriterias();
  }

  getCriterias(): void {
    if (this.evaluationComponent && this.course) {
      this.criteriaService
        .getCriterias(this.course, this.evaluationComponent)
        .subscribe((response) => this.criterias = response);
    }
  }

  add(name: string, number: string): void {name = name.trim(); if (!name || !number) { return; }
    var percent : number;
    percent = parseFloat(number);
    if (this.evaluationComponent && this.course)
    {
    this.criteriaService.addCriteria(this.course, this.evaluationComponent, {name, percent} as Criteria)
      .subscribe(student => {
        this.criterias.push(student);
      });
    }
  }

  delete(criteria: Criteria): void {
    if (this.evaluationComponent && this.course) {
      this.criterias = this.criterias.filter((c) => c !== criteria);
      this.criteriaService
        .deleteCriteria(criteria._id, this.evaluationComponent, this.course)
        .subscribe();
    }
  }

}
