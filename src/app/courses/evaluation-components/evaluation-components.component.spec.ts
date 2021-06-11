import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationComponentsComponent } from './evaluation-components.component';

describe('EvaluationComponentsComponent', () => {
  let component: EvaluationComponentsComponent;
  let fixture: ComponentFixture<EvaluationComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
