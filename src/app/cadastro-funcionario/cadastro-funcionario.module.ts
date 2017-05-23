import { ValorModule } from './../diretivas/valor/valor.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { GrowlModule } from 'primeng/primeng';
import { FileUploadModule } from 'ng2-file-upload';
import { TelefoneModule } from './../diretivas/telefone/telefone.module';
import { CpfModule } from './../diretivas/cpf/cpf.module';
import { CadastroFuncionarioComponent } from './cadastro-funcionario.component';
import { FtpService } from './../servicos/ftp.service';
import { FuncionarioService } from './../servicos/funcionario.service';

const rotas = [ { path: '', component: CadastroFuncionarioComponent } ];

@NgModule({
   imports: [
    CommonModule,
    FormsModule,
    CpfModule,
    TelefoneModule,
    FileUploadModule,
    GrowlModule,
    ValorModule,
    RouterModule.forChild(rotas)
  ],
   declarations: [CadastroFuncionarioComponent],
  providers:[FuncionarioService,  FtpService],
  exports: []
})
export class CadastroFuncionarioModule { }
