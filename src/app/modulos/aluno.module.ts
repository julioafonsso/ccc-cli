import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaAlunosDebitoComponent } from './../consulta-alunos-debito/consulta-alunos-debito.component';
import { ConsultaAlunoComponent } from './../consulta-aluno/consulta-aluno.component';
import { CadastroAlunoComponent } from './../cadastro-aluno/cadastro-aluno.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CadastroAlunoComponent, ConsultaAlunoComponent, ConsultaAlunosDebitoComponent]
})
export class AlunoModule { }
