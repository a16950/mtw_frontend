import { Component, OnInit, Input } from '@angular/core';
import { EvaluationComponent } from '../courses/evaluation-components/evaluation-component';
import { Course } from '../courses/course';
import { Criteria } from '../criteria/criteria';
import { CriteriaService } from '../criteria/criteria.service';

@Component({
  selector: 'app-criteria-detail',
  templateUrl: './criteria-detail.component.html',
  styleUrls: ['./criteria-detail.component.css']
})
export class CriteriaDetailComponent implements OnInit {
  @Input() evaluation?:EvaluationComponent
  @Input() course?:Course
  @Input() criteria?:Criteria
  

  constructor(private criteriaService: CriteriaService) { }

  ngOnInit(): void {
    this.evaluation = history.state.evaluation;
    this.course = history.state.course;
    this.criteria = history.state.criteria;
  }

  save(): void {
    if (this.evaluation && this.course && this.criteria) {
      this.criteriaService.updateCriteria(this.course,this.evaluation,this.criteria)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
  }
}
