import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatorioMovimentacaoCaixaComponent } from './relatorio-movimentacao-caixa.component';


const rotas = [ { path: '', component: RelatorioMovimentacaoCaixaComponent } ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [RelatorioMovimentacaoCaixaComponent]
})
export class RelatorioMovimentacaoCaixaModule { }
