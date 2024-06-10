import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { getProductCategoriesResolver } from './get-product-categories.resolver';

describe('getProductCategoriesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => getProductCategoriesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
