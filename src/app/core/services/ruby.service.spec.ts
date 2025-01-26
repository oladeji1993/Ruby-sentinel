import { TestBed } from '@angular/core/testing';

import { RubyService } from './ruby.service';

describe('RubyService', () => {
  let service: RubyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
