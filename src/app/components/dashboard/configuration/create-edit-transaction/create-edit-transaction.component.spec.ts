import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTransactionComponent } from './create-edit-transaction.component';

describe('CreateEditTransactionComponent', () => {
  let component: CreateEditTransactionComponent;
  let fixture: ComponentFixture<CreateEditTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditTransactionComponent]
    });
    fixture = TestBed.createComponent(CreateEditTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
