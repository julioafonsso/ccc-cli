import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NumeroInteiroModule } from './../diretivas/numero-inteiro/numero-inteiro.module';
import { DescontoService } from './../servicos/desconto.service';
import { CadastroTipoDescontoComponent } from './cadastro-tipo-desconto.component';
import { GrowlModule } from 'primeng/primeng';

const rotas = [ { path: '', component: CadastroTipoDescontoComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GrowlModule,
    NumeroInteiroModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [CadastroTipoDescontoComponent],
  providers:[DescontoService],
  exports: []
})
export class CadastroTipoDescontoModule { }
