/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TurmaService } from './turma.service';

describe('TurmaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TurmaService]
    });
  });

  it('should ...', inject([TurmaService], (service: TurmaService) => {
    expect(service).toBeTruthy();
  }));
});
