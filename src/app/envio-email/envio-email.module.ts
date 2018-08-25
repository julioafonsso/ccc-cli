import { EmailService } from './../servicos/email-service';
import { EnvioEmailComponent } from './envio-email.component';
import { RouterModule } from '@angular/router';
import { GrowlModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { FtpService } from '../servicos/ftp.service';

const rotas = [ { path: '', component: EnvioEmailComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GrowlModule,
    FileUploadModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [EnvioEmailComponent],
  providers: [ FtpService, EmailService ],
  exports: []
})
export class EnvioEmailModule { }
