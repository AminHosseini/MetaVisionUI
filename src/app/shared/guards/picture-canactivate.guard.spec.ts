import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pictureCanactivateGuard } from './picture-canactivate.guard';

describe('pictureCanactivateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => pictureCanactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
