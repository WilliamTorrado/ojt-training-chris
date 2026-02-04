import { TestBed } from '@angular/core/testing';

import { AdrressService } from './adrress.service';

describe('AdrressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdrressService = TestBed.get(AdrressService);
    expect(service).toBeTruthy();
  });
});
