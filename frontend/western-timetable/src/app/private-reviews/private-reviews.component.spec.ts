import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateReviewsComponent } from './private-reviews.component';

describe('PrivateReviewsComponent', () => {
  let component: PrivateReviewsComponent;
  let fixture: ComponentFixture<PrivateReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
