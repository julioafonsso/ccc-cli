import { TipoTurmaService } from './../servicos/tipo-turma.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroTurmaComponent } from './cadastro-turma.component';
import { TurmaService } from './../servicos/turma.service';
import { ProfessorService } from './../servicos/professor.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CadastroTurmaComponent],
  providers: [TipoTurmaService, TurmaService, ProfessorService]
})
export class CadastroTurmaModule { }
