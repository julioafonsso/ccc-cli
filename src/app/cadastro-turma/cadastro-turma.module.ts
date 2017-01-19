import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroTurmaComponent } from './cadastro-turma.component';
import { TurmaService } from './../servicos/turma.service';
import { ProfessorService } from './../servicos/professor.service';

const rotas = [ { path: '', component: CadastroTurmaComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [CadastroTurmaComponent],
  providers: [ TurmaService, ProfessorService],
  exports: []
})
export class CadastroTurmaModule { }
