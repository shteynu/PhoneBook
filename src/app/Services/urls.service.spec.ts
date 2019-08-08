import { TestBed } from '@angular/core/testing';

import { URLsService } from './urls.service';

describe('URLsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: URLsService = TestBed.get(URLsService);
    expect(service).toBeTruthy();
  });
});
