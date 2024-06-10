import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { getProductCategoryCanactivateGuard } from './get-product-category-canactivate.guard';

describe('getProductCategoryCanactivateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => getProductCategoryCanactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
