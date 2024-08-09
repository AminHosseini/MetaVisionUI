import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { getPicturesResolver } from './get-pictures.resolver';

describe('getPicturesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => getPicturesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
