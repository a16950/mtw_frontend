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

  ngOnInit(): void {}

  ngOnChanges(course: Course): void {
    this.getEvaluationComponents();
  }

  getEvaluationComponents(): void {
    if (this.course) {
      this.evaluationComponentService
        .getEvaluationComponents(this.course)
        .subscribe((response) => this.evaluationComponents = response);
    }
  }
}
