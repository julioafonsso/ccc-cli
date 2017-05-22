import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FtpService } from './../servicos/ftp.service';
import { GrowlModule } from 'primeng/primeng';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { CpfModule } from './../diretivas/cpf/cpf.module';
import { TelefoneModule } from './../diretivas/telefone/telefone.module';
import { CadastroAlunoComponent } from './cadastro-aluno.component';
import { AlunoService } from './../servicos/aluno.service';
import { BairroService } from './../servicos/bairro.service';

const rotas = [ { path: '', component: CadastroAlunoComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TelefoneModule,
    CpfModule,
    FileUploadModule,
    GrowlModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [CadastroAlunoComponent],
  providers: [AlunoService, FtpService, BairroService],
  exports: []

})
export class CadastroAlunoModule { }
