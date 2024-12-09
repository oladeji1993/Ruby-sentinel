import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAndEditEventComponent } from './create-and-edit-event.component';

describe('CreateAndEditEventComponent', () => {
  let component: CreateAndEditEventComponent;
  let fixture: ComponentFixture<CreateAndEditEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAndEditEventComponent]
    });
    fixture = TestBed.createComponent(CreateAndEditEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
