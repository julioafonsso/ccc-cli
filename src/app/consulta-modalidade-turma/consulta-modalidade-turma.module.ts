import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ConsultaModalidadeTurmaComponent } from './consulta-modalidade-turma.component';
import { TurmaService } from './../servicos/turma.service';


const rotas = [ { path: '', component: ConsultaModalidadeTurmaComponent } ];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [ConsultaModalidadeTurmaComponent],
  providers: [TurmaService],
  exports: []
})
export class ConsultaModalidadeTurmaModule { }
