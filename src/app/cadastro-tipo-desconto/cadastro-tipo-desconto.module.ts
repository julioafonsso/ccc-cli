import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroTipoDescontoComponent } from './cadastro-tipo-desconto.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [CadastroTipoDescontoComponent]
})
export class CadastroTipoDescontoModule { }
