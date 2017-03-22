import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoFluxoCaixaService } from './../servicos/tipo-fluxo-caixa.service';
import { ConsultaTipoFluxoComponent } from './consulta-tipo-fluxo.component';
import { GrowlModule } from 'primeng/primeng';

const rotas = [ { path: '', component: ConsultaTipoFluxoComponent } ];
@NgModule({
  imports: [
    CommonModule,
    GrowlModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [ConsultaTipoFluxoComponent],
  providers: [TipoFluxoCaixaService],
  exports: []
})
export class ConsultaTipoFluxoModule { }
