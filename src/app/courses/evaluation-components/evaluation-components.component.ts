import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../courses/course';
import { EvaluationComponentService } from './evaluation-component.service';
import { EvaluationComponent } from './evaluation-component';

@Component({
  selector: 'app-evaluation-components',
  templateUrl: './evaluation-components.component.html',
  styleUrls: ['./evaluation-components.component.css'],
})
export class EvaluationComponentsComponent implements OnInit {
  evaluationComponents: EvaluationComponent[] = [];

  @Input() course?: Course;

  constructor(private evaluationComponentService: EvaluationComponentService) {}

  ngOnInit(): void {
    this.course = history.state;
    this.getEvaluationComponents();
  }


  getEvaluationComponents(): void {
    if (this.course) {
      this.evaluationComponentService
        .getEvaluationComponents(this.course)
        .subscribe((response) => this.evaluationComponents = response);
    }
  }

  add(name: string): void {name = name.trim(); if (!name) { return; }
    if (this.course)
    {
    this.evaluationComponentService.addEvaluation(this.course, { name } as EvaluationComponent)
      .subscribe(evaluation => {
        this.evaluationComponents.push(evaluation);
      });
    }
  }

  delete(evaluationComponent: EvaluationComponent): void {
    if (this.course)
    {
    this.evaluationComponents = this.evaluationComponents.filter(c => c !== evaluationComponent);
    this.evaluationComponentService.deleteEvaluation(evaluationComponent._id,this.course).subscribe();
    }
  }
  
}
