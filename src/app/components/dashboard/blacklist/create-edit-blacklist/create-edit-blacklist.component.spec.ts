import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditBlacklistComponent } from './create-edit-blacklist.component';

describe('CreateEditBlacklistComponent', () => {
  let component: CreateEditBlacklistComponent;
  let fixture: ComponentFixture<CreateEditBlacklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditBlacklistComponent]
    });
    fixture = TestBed.createComponent(CreateEditBlacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
