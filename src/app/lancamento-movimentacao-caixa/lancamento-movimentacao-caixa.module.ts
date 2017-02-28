import { ValorModule } from './../diretivas/valor/valor.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LancamentoMovimentacaoCaixaComponent } from './lancamento-movimentacao-caixa.component';
import { FluxoCaixaService } from './../servicos/fluxo-caixa.service';
import { TipoFluxoCaixaService } from './../servicos/tipo-fluxo-caixa.service';
import { GrowlModule } from 'primeng/primeng';

const rotas = [ { path: '', component: LancamentoMovimentacaoCaixaComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GrowlModule,
    ValorModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [LancamentoMovimentacaoCaixaComponent],
  providers: [TipoFluxoCaixaService, FluxoCaixaService] ,
  exports: []
})
export class LancamentoMovimentacaoCaixaModule { }
