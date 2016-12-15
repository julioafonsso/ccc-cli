/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CadastroTurmaService } from './cadastro-turma.service';

describe('CadastroTurmaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CadastroTurmaService]
    });
  });

  it('should ...', inject([CadastroTurmaService], (service: CadastroTurmaService) => {
    expect(service).toBeTruthy();
  }));
});
