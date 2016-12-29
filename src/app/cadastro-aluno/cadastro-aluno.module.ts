import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroAlunoComponent } from './cadastro-aluno.component';
import { AlunoService } from './../servicos/aluno.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [CadastroAlunoComponent],
  providers: [AlunoService]
})
export class CadastroAlunoModule { }
