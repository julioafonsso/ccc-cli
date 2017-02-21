import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TelefoneDirective } from './telefone.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TelefoneDirective],
  exports:[TelefoneDirective],
  providers:[]
})
export class TelefoneModule { }
