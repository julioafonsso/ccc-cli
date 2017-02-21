import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroTipoFluxoCaixaComponent } from './cadastro-tipo-fluxo-caixa.component';
import { TipoFluxoCaixaService } from './../servicos/tipo-fluxo-caixa.service';
import { GrowlModule } from 'primeng/primeng';

const rotas = [ { path: '', component: CadastroTipoFluxoCaixaComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GrowlModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [CadastroTipoFluxoCaixaComponent],
  providers: [TipoFluxoCaixaService],
  exports: []
})
export class CadastroTipoFluxoCaixaModule { }
