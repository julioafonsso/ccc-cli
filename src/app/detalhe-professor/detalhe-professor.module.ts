import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalheProfessorComponent } from './detalhe-professor.component';
import { ProfessorService } from './../servicos/professor.service';


const rotas = [ { path: '', component: DetalheProfessorComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [DetalheProfessorComponent],
  providers: [ProfessorService],
  exports: []
})
export class DetalheProfessorModule { }
