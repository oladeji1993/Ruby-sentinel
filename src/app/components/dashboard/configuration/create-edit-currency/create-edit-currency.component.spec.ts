import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditCurrencyComponent } from './create-edit-currency.component';

describe('CreateEditCurrencyComponent', () => {
  let component: CreateEditCurrencyComponent;
  let fixture: ComponentFixture<CreateEditCurrencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditCurrencyComponent]
    });
    fixture = TestBed.createComponent(CreateEditCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
