import { TestBed } from '@angular/core/testing';

import { FireBaseCodeErrorsService } from './fire-base-code-errors.service';

describe('FireBaseCodeErrorsService', () => {
  let service: FireBaseCodeErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireBaseCodeErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
