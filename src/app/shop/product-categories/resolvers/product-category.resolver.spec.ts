import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { productCategoryResolver } from './product-category.resolver';

describe('productCategoryResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => productCategoryResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
