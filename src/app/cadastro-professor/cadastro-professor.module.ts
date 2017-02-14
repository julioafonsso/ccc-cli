import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroProfessorComponent } from './cadastro-professor.component';
import { ProfessorService } from './../servicos/professor.service';
import { CpfModule } from './../diretivas/cpf/cpf.module';

const rotas = [ { path: '', component: CadastroProfessorComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CpfModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [CadastroProfessorComponent],
  providers:[ProfessorService],
  exports: []
})
export class CadastroProfessorModule { }
