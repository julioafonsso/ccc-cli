import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { GrowlModule } from 'primeng/primeng';


import { ConsultaModalidadeTurmaComponent } from './consulta-modalidade-turma.component';
import { TurmaService } from './../servicos/turma.service';


const rotas = [ { path: '', component: ConsultaModalidadeTurmaComponent } ];
@NgModule({
  imports: [
    CommonModule,
    GrowlModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [ConsultaModalidadeTurmaComponent],
  providers: [TurmaService],
  exports: []
})
export class ConsultaModalidadeTurmaModule { }
