/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FtpService } from './ftp.service';

describe('FtpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FtpService]
    });
  });

  it('should ...', inject([FtpService], (service: FtpService) => {
    expect(service).toBeTruthy();
  }));
});
