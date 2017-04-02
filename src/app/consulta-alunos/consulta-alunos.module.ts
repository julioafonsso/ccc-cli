import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaAlunosComponent } from './consulta-alunos.component';
import { AlunoService } from './../servicos/aluno.service';

const rotas = [{ path: '', component: ConsultaAlunosComponent }];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [ConsultaAlunosComponent],
  providers: [AlunoService],
  exports: []
})

export class ConsultaAlunosModule { }
