/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TipoFluxoCaixaService } from './tipo-fluxo-caixa.service';

describe('TipoFluxoCaixaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoFluxoCaixaService]
    });
  });

  it('should ...', inject([TipoFluxoCaixaService], (service: TipoFluxoCaixaService) => {
    expect(service).toBeTruthy();
  }));
});
