import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatorioMovimentacaoCaixaComponent } from './relatorio-movimentacao-caixa.component';
import { ExtratoService } from './../servicos/extrato.service';

import {CalendarModule} from 'primeng/primeng';
// import { ChartModule } from 'primeng/primeng';
import { ChartsModule, Color } from 'ng2-charts';



const rotas = [ { path: '', component: RelatorioMovimentacaoCaixaComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    CalendarModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [RelatorioMovimentacaoCaixaComponent],
  providers:[ExtratoService],
  exports: []
})
export class RelatorioMovimentacaoCaixaModule { }
