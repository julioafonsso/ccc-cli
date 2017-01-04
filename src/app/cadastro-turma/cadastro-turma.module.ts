import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroTurmaComponent } from './cadastro-turma.component';
import { TurmaService } from './../servicos/turma.service';
import { ProfessorService } from './../servicos/professor.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [CadastroTurmaComponent],
  providers: [ TurmaService, ProfessorService]
})
export class CadastroTurmaModule { }
