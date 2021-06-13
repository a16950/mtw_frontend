import { Component, OnInit, Input } from '@angular/core';
import { EvaluationComponent } from '../courses/evaluation-components/evaluation-component';
import { EvaluationComponentService } from '../courses/evaluation-components/evaluation-component.service';
import { Course } from '../courses/course';

@Component({
  selector: 'app-evaluation-detail',
  templateUrl: './evaluation-detail.component.html',
  styleUrls: ['./evaluation-detail.component.css']
})
export class EvaluationDetailComponent implements OnInit {
  @Input() evaluation?:EvaluationComponent
  @Input() course?:Course
  

  constructor(private evaluationService: EvaluationComponentService) { }

  ngOnInit(): void {
    this.evaluation = history.state.evaluation;
    this.course = history.state.course;
  }

  save(): void {
    if (this.evaluation && this.course) {
      this.evaluationService.updateEvaluation(this.evaluation,this.course)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
  }

}