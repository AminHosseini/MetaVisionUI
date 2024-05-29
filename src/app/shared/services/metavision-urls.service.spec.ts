import { TestBed } from '@angular/core/testing';

import { MetavisionUrlsService } from './metavision-urls.service';

describe('MetavisionUrlsService', () => {
  let service: MetavisionUrlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetavisionUrlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
