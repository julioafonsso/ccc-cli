/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BairroService } from './bairro.service';

describe('BairroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BairroService]
    });
  });

  it('should ...', inject([BairroService], (service: BairroService) => {
    expect(service).toBeTruthy();
  }));
});
