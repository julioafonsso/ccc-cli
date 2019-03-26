/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SupervisaoService } from './supervisao.service';

describe('SupervisaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupervisaoService]
    });
  });

  it('should ...', inject([SupervisaoService], (service: SupervisaoService) => {
    expect(service).toBeTruthy();
  }));
});
