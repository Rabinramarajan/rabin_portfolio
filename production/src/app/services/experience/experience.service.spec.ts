import { TestBed } from '@angular/core/testing';

import { ExperienceService } from './experience.service';

describe('ExperienceService', () => {
  let service: ExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getExperienceYears', () => {
    beforeEach(() => {
      // Freeze time to 2025-10-28 for deterministic tests
      jasmine.clock().install();
      jasmine.clock().mockDate(new Date(2025, 9, 28)); // months are 0-based
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('returns "3 years 5 months" for a date 3 years and 5 months ago', () => {
      const start = new Date(2022, 4, 15); // 2022-05-15
      expect(service.getExperienceYears(start)).toBe('3 years 5 months');
    });

    it('handles singular labels correctly ("1 year 1 month")', () => {
      const start = new Date(2024, 8, 28); // 2024-09-28
      expect(service.getExperienceYears(start)).toBe('1 year 1 month');
    });

    it('returns only months when under a year', () => {
      const start = new Date(2025, 4, 1); // 2025-05-01 => 5 months
      expect(service.getExperienceYears(start)).toBe('5 months');
    });

    it('returns "0 months" when within the same month', () => {
      const start = new Date(2025, 9, 1); // 2025-10-01
      expect(service.getExperienceYears(start)).toBe('0 months');
    });

    it('returns "0 months" for future dates', () => {
      const start = new Date(2025, 11, 1); // 2025-12-01 (future)
      expect(service.getExperienceYears(start)).toBe('0 months');
    });
  });
});
