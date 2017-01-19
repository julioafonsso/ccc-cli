import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroAlunoComponent } from './cadastro-aluno.component';
import { AlunoService } from './../servicos/aluno.service';

const rotas = [ { path: '', component: CadastroAlunoComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [CadastroAlunoComponent],
  providers: [AlunoService],
  exports: []

})
export class CadastroAlunoModule { }
