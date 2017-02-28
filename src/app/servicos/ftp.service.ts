import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';

@Injectable()
export class FtpService {

  constructor() { }



  alterarFoto(idFoto : string, upload: FileUploader) {
        upload.setOptions({ url: environment.url + "ftp/foto/"+ idFoto });
        upload.uploadAll();
  }   

  cadastrarFoto(upload: FileUploader) {
        upload.setOptions({ url: environment.url + "ftp/foto/" })
        upload.uploadAll();
  }
}
