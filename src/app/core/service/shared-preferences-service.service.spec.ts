import { TestBed, inject } from '@angular/core/testing';

import { SharedPreferencesServiceService } from './shared-preferences-service.service';

describe('SharedPreferencesServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedPreferencesServiceService]
    });
  });

  it('should be created', inject([SharedPreferencesServiceService], (service: SharedPreferencesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
