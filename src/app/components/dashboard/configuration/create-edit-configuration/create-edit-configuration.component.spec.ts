import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditConfigurationComponent } from './create-edit-configuration.component';

describe('CreateEditConfigurationComponent', () => {
  let component: CreateEditConfigurationComponent;
  let fixture: ComponentFixture<CreateEditConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditConfigurationComponent]
    });
    fixture = TestBed.createComponent(CreateEditConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
