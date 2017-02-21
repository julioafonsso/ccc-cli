/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DescontoService } from './desconto.service';

describe('DescontoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DescontoService]
    });
  });

  it('should ...', inject([DescontoService], (service: DescontoService) => {
    expect(service).toBeTruthy();
  }));
});
