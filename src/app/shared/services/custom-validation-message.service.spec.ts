import { TestBed } from '@angular/core/testing';

import { CustomValidationMessageService } from './custom-validation-message.service';

describe('CustomValidationMessageService', () => {
  let service: CustomValidationMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomValidationMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
