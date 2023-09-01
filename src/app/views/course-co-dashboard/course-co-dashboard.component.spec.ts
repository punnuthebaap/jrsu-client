import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCoDashboardComponent } from './course-co-dashboard.component';

describe('CourseCoDashboardComponent', () => {
  let component: CourseCoDashboardComponent;
  let fixture: ComponentFixture<CourseCoDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseCoDashboardComponent]
    });
    fixture = TestBed.createComponent(CourseCoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
