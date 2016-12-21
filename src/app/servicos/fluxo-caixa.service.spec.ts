/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FluxoCaixaService } from './fluxo-caixa.service';

describe('FluxoCaixaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FluxoCaixaService]
    });
  });

  it('should ...', inject([FluxoCaixaService], (service: FluxoCaixaService) => {
    expect(service).toBeTruthy();
  }));
});
