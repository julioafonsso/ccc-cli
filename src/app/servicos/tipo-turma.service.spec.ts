/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TipoTurmaService } from './tipo-turma.service';

describe('TipoTurmaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoTurmaService]
    });
  });

  it('should ...', inject([TipoTurmaService], (service: TipoTurmaService) => {
    expect(service).toBeTruthy();
  }));
});
