import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroTurmaService } from './../cadastro-turma/cadastro-turma.service';
import { CadastroTurmaComponent } from './../cadastro-turma/cadastro-turma.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CadastroTurmaComponent],
  providers: [CadastroTurmaService]
})
export class TurmaModule { }

export class DiasAulas {
  constructor(
    public nome: String,
    public valor: number,
    public check: boolean
  ) { }
}
