import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroTipoDescontoComponent } from './cadastro-tipo-desconto.component';

const rotas = [ { path: '', component: CadastroTipoDescontoComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [CadastroTipoDescontoComponent]
})
export class CadastroTipoDescontoModule { }
