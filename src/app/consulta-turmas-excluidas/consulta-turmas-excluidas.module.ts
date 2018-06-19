import { GrowlModule } from 'primeng/primeng';
import { ProfessorService } from './../servicos/professor.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaTurmasExcluidasComponent } from './consulta-turmas-excluidas.component';
import { TurmaService } from './../servicos/turma.service';


const rotas = [ { path: '', component: ConsultaTurmasExcluidasComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GrowlModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [ConsultaTurmasExcluidasComponent],
  providers: [TurmaService],
  exports: []
})
export class ConsultaTurmasExcluidasModule { }
