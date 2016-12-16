import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LancamentoMovimentacaoCaixaComponent } from './../lancamento-movimentacao-caixa/lancamento-movimentacao-caixa.component';
import { RelatorioMovimentacaoCaixaComponent } from './../relatorio-movimentacao-caixa/relatorio-movimentacao-caixa.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LancamentoMovimentacaoCaixaComponent, RelatorioMovimentacaoCaixaComponent]
})
export class MovimentacaoCaixaModule { }
