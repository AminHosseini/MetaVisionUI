import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { pictureCandeactivateGuard } from './picture-candeactivate.guard';

describe('pictureCandeactivateGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => pictureCandeactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
