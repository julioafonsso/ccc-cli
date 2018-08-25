import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';

@Injectable()
export class FtpService {

  constructor() { }

  cadastrarFoto(upload: FileUploader) {
        upload.setOptions({ url: environment.url + "ftp/foto/" })
        upload.uploadAll();
  }

  cadastrarFotoEmail(upload: FileUploader) {
    upload.setOptions({ url: environment.url + "ftp/foto/email" })
    upload.uploadAll();
}
}
