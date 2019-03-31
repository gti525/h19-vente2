import { TestBed } from '@angular/core/testing';

import { CartUpdateService } from './cart-update.service';

describe('CartUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartUpdateService = TestBed.get(CartUpdateService);
    expect(service).toBeTruthy();
  });
});
