import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FtpService } from './../servicos/ftp.service';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { CadastroProfessorComponent } from './cadastro-professor.component';
import { ProfessorService } from './../servicos/professor.service';
import { CpfModule } from './../diretivas/cpf/cpf.module';
import { TelefoneModule } from './../diretivas/telefone/telefone.module';
import { GrowlModule } from 'primeng/primeng';


const rotas = [ { path: '', component: CadastroProfessorComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CpfModule,
    TelefoneModule,
    FileUploadModule,
    GrowlModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [CadastroProfessorComponent],
  providers:[ProfessorService,  FtpService],
  exports: []
})
export class CadastroProfessorModule { }
