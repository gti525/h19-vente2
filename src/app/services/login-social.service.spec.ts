import { TestBed } from '@angular/core/testing';

import { LoginSocialService } from './login-social.service';

describe('LoginSocialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginSocialService = TestBed.get(LoginSocialService);
    expect(service).toBeTruthy();
  });
});
