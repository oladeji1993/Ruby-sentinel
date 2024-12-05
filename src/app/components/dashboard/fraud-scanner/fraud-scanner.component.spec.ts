import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudScannerComponent } from './fraud-scanner.component';

describe('FraudScannerComponent', () => {
  let component: FraudScannerComponent;
  let fixture: ComponentFixture<FraudScannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FraudScannerComponent]
    });
    fixture = TestBed.createComponent(FraudScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
