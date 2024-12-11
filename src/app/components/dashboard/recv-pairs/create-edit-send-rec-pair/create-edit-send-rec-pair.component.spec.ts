import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditSendRecPairComponent } from './create-edit-send-rec-pair.component';

describe('CreateEditSendRecPairComponent', () => {
  let component: CreateEditSendRecPairComponent;
  let fixture: ComponentFixture<CreateEditSendRecPairComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditSendRecPairComponent]
    });
    fixture = TestBed.createComponent(CreateEditSendRecPairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
