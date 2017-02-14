import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValorDirective } from './valor.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ValorDirective],
  exports:[ValorDirective],
  providers:[]
})
export class ValorModule { }
