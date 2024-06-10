import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { getProductCategoryCandeactivateGuard } from './get-product-category-candeactivate.guard';

describe('getProductCategoryCandeactivateGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => getProductCategoryCandeactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
