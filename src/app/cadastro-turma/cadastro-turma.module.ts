import { CadastroTurmaService } from './cadastro-turma.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroTurmaComponent } from './cadastro-turma.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CadastroTurmaComponent],
  providers: [CadastroTurmaService]
})
export class CadastroTurmaModule { }

export class DiasAulas {
  constructor(
    public nome: String,
    public valor: number,
    public check: boolean
  ) { }
}
