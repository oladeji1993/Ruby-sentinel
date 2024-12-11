import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecvPairsComponent } from './recv-pairs.component';

describe('RecvPairsComponent', () => {
  let component: RecvPairsComponent;
  let fixture: ComponentFixture<RecvPairsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecvPairsComponent]
    });
    fixture = TestBed.createComponent(RecvPairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
