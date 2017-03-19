import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoFluxoCaixaService } from './../servicos/tipo-fluxo-caixa.service';
import { ConsultaTipoFluxoComponent } from './consulta-tipo-fluxo.component';

const rotas = [ { path: '', component: ConsultaTipoFluxoComponent } ];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [ConsultaTipoFluxoComponent],
  providers: [TipoFluxoCaixaService],
  exports: []
})
export class ConsultaTipoFluxoModule { }
