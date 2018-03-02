import { FluxoCaixaService } from './../servicos/fluxo-caixa.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatorioMovimentacaoCaixaComponent } from './relatorio-movimentacao-caixa.component';
import { ExtratoService } from './../servicos/extrato.service';

import { CalendarModule, GrowlModule } from 'primeng/primeng';
import { ChartsModule, Color } from 'ng2-charts';



const rotas = [ { path: '', component: RelatorioMovimentacaoCaixaComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    CalendarModule,
    GrowlModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [RelatorioMovimentacaoCaixaComponent],
  providers:[ExtratoService, FluxoCaixaService],
  exports: []
})
export class RelatorioMovimentacaoCaixaModule { }
