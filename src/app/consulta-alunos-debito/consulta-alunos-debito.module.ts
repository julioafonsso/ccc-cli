import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaAlunosDebitoComponent } from './consulta-alunos-debito.component';
import { AlunoService } from './../servicos/aluno.service';

const rotas = [ { path: '', component: ConsultaAlunosDebitoComponent } ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [ConsultaAlunosDebitoComponent],
  providers: [AlunoService],
  exports: []
})
export class ConsultaAlunosDebitoModule { }
