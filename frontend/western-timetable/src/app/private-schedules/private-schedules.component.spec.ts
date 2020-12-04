import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSchedulesComponent } from './private-schedules.component';

describe('PrivateSchedulesComponent', () => {
  let component: PrivateSchedulesComponent;
  let fixture: ComponentFixture<PrivateSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
