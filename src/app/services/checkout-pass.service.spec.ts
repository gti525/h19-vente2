import { TestBed } from '@angular/core/testing';

import { CheckoutPassService } from './checkout-pass.service';

describe('CheckoutPassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckoutPassService = TestBed.get(CheckoutPassService);
    expect(service).toBeTruthy();
  });
});
