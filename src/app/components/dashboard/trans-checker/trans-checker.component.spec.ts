import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransCheckerComponent } from './trans-checker.component';

describe('TransCheckerComponent', () => {
  let component: TransCheckerComponent;
  let fixture: ComponentFixture<TransCheckerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransCheckerComponent]
    });
    fixture = TestBed.createComponent(TransCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
