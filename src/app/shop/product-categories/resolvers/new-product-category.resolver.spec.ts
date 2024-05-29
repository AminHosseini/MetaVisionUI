import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { newProductCategoryResolver } from './new-product-category.resolver';

describe('newProductCategoryResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => newProductCategoryResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
