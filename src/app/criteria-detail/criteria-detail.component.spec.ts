import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaDetailComponent } from './criteria-detail.component';

describe('CriteriaDetailComponent', () => {
  let component: CriteriaDetailComponent;
  let fixture: ComponentFixture<CriteriaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
