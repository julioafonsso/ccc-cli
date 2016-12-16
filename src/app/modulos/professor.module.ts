import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatorioPagamentoProfessorComponent } from './../relatorio-pagamento-professor/relatorio-pagamento-professor.component';
import { ManutencaoProfessorComponent } from './../manutencao-professor/manutencao-professor.component';
import { CadastroProfessorComponent } from './../cadastro-professor/cadastro-professor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CadastroProfessorComponent, ManutencaoProfessorComponent, RelatorioPagamentoProfessorComponent]
})
export class ProfessorModule { }
