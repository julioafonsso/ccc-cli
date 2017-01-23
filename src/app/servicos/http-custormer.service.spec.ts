/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpCustormerService } from './http-custormer.service';

describe('HttpCustormerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpCustormerService]
    });
  });

  it('should ...', inject([HttpCustormerService], (service: HttpCustormerService) => {
    expect(service).toBeTruthy();
  }));
});
