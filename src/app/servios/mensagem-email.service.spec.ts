/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MensagemEmailService } from './mensagem-email.service';

describe('MensagemEmailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MensagemEmailService]
    });
  });

  it('should ...', inject([MensagemEmailService], (service: MensagemEmailService) => {
    expect(service).toBeTruthy();
  }));
});
