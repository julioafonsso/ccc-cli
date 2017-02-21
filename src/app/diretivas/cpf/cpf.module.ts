import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CpfDirective } from './cpf.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CpfDirective],
  exports: [CpfDirective],
  providers : []
})
export class CpfModule { }
