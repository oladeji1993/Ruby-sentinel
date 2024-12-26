import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseTransactionComponent } from './release-transaction.component';

describe('ReleaseTransactionComponent', () => {
  let component: ReleaseTransactionComponent;
  let fixture: ComponentFixture<ReleaseTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReleaseTransactionComponent]
    });
    fixture = TestBed.createComponent(ReleaseTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
