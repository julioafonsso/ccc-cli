import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NumeroInteiroDirective } from './numero-inteiro.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NumeroInteiroDirective],
  exports: [NumeroInteiroDirective],
  providers: []
})
export class NumeroInteiroModule { }
