/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlunoService } from './aluno.service';

describe('AlunoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlunoService]
    });
  });

  it('should ...', inject([AlunoService], (service: AlunoService) => {
    expect(service).toBeTruthy();
  }));
});
