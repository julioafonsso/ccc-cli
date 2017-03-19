import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaTipoDescontoComponent } from './consulta-tipo-desconto.component';
import { DescontoService } from './../servicos/desconto.service';


const rotas = [ { path: '', component: ConsultaTipoDescontoComponent } ];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [ConsultaTipoDescontoComponent],
  providers: [DescontoService],
  exports: []
})
export class ConsultaTipoDescontoModule { }
