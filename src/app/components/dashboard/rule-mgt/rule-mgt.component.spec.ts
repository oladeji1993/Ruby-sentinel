import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleMgtComponent } from './rule-mgt.component';

describe('RuleMgtComponent', () => {
  let component: RuleMgtComponent;
  let fixture: ComponentFixture<RuleMgtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RuleMgtComponent]
    });
    fixture = TestBed.createComponent(RuleMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
