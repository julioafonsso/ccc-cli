import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LancamentoMovimentacaoCaixaComponent } from './lancamento-movimentacao-caixa.component';
import { FluxoCaixaService } from './../servicos/fluxo-caixa.service';
import { TipoFluxoCaixaService } from './../servicos/tipo-fluxo-caixa.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LancamentoMovimentacaoCaixaComponent],
  providers: [TipoFluxoCaixaService, FluxoCaixaService] 
})
export class LancamentoMovimentacaoCaixaModule { }
