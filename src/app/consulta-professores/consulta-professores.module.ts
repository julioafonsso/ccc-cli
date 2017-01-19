import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaProfessoresComponent } from './consulta-professores.component';
import { ProfessorService } from './../servicos/professor.service';

const rotas = [ { path: '', component: ConsultaProfessoresComponent } ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [ConsultaProfessoresComponent],
  providers: [ProfessorService],
  exports: []
})
export class ConsultaProfessoresModule { }
