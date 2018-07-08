import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateApplyComponent } from './candidate-apply.component';

describe('CandidateApplyComponent', () => {
  let component: CandidateApplyComponent;
  let fixture: ComponentFixture<CandidateApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
