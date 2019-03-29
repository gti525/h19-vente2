import { TestBed } from '@angular/core/testing';

import { HeaderUpdateService } from './header-update.service';

describe('HeaderUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeaderUpdateService = TestBed.get(HeaderUpdateService);
    expect(service).toBeTruthy();
  });
});
