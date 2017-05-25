import { TestBed, inject } from '@angular/core/testing';

import { LogoutService } from './logout.service';

describe('Logout', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogoutService]
    });
  });

  it('should be created', inject([LogoutService], (service: LogoutService) => {
    expect(service).toBeTruthy();
  }));
});
