import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBreachesComponent } from './account-breaches.component';

describe('AccountBreachesComponent', () => {
  let component: AccountBreachesComponent;
  let fixture: ComponentFixture<AccountBreachesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountBreachesComponent]
    });
    fixture = TestBed.createComponent(AccountBreachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
