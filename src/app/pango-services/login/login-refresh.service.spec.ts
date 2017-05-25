import { TestBed, inject } from '@angular/core/testing';

import { LoginRefreshService } from './login-refresh.service';

describe('LoginRefreshService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginRefreshService]
    });
  });

  it('should be created', inject([LoginRefreshService], (service: LoginRefreshService) => {
    expect(service).toBeTruthy();
  }));
});
