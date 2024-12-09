import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStaticRuleComponent } from './create-static-rule.component';

describe('CreateStaticRuleComponent', () => {
  let component: CreateStaticRuleComponent;
  let fixture: ComponentFixture<CreateStaticRuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateStaticRuleComponent]
    });
    fixture = TestBed.createComponent(CreateStaticRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
