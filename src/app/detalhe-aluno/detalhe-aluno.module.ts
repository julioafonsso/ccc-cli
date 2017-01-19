import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoService } from './../servicos/aluno.service';
import { DetalheAlunoComponent } from './detalhe-aluno.component';

const rotas = [ { path: '', component: DetalheAlunoComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [DetalheAlunoComponent],
  providers: [AlunoService],
  exports: []
})
export class DetalheAlunoModule { }
