import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditBankComponent } from './create-edit-bank.component';

describe('CreateEditBankComponent', () => {
  let component: CreateEditBankComponent;
  let fixture: ComponentFixture<CreateEditBankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditBankComponent]
    });
    fixture = TestBed.createComponent(CreateEditBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
