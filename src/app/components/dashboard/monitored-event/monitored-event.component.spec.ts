import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoredEventComponent } from './monitored-event.component';

describe('MonitoredEventComponent', () => {
  let component: MonitoredEventComponent;
  let fixture: ComponentFixture<MonitoredEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonitoredEventComponent]
    });
    fixture = TestBed.createComponent(MonitoredEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
