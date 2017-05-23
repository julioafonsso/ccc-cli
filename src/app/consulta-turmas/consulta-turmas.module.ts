import { ProfessorService } from './../servicos/professor.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaTurmasComponent } from './consulta-turmas.component';
import { TurmaService } from './../servicos/turma.service';


const rotas = [ { path: '', component: ConsultaTurmasComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [ConsultaTurmasComponent],
  providers: [TurmaService],
  exports: []
})
export class ConsultaTurmasModule { }
