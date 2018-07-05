import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpPostEnrollmentComponent } from './up-post-enrollment.component';

describe('UpPostEnrollmentComponent', () => {
  let component: UpPostEnrollmentComponent;
  let fixture: ComponentFixture<UpPostEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpPostEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpPostEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
