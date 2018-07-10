import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCooperationComponent } from './manage-cooperation.component';

describe('ManageCooperationComponent', () => {
  let component: ManageCooperationComponent;
  let fixture: ComponentFixture<ManageCooperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCooperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCooperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
