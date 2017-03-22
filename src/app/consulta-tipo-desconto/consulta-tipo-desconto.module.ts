import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrowlModule } from 'primeng/primeng';


import { ConsultaTipoDescontoComponent } from './consulta-tipo-desconto.component';
import { DescontoService } from './../servicos/desconto.service';


const rotas = [ { path: '', component: ConsultaTipoDescontoComponent } ];


@NgModule({
  imports: [
    CommonModule,
    GrowlModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [ConsultaTipoDescontoComponent],
  providers: [DescontoService],
  exports: []
})
export class ConsultaTipoDescontoModule { }
