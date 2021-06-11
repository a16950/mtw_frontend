import { TestBed } from '@angular/core/testing';

import { EvaluationComponentService } from './evaluation-component.service';

describe('EvaluationComponentService', () => {
  let service: EvaluationComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
