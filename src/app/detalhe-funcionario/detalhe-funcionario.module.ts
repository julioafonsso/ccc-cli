import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioService } from './../servicos/funcionario.service';
import { DetalheFuncionarioComponent } from './detalhe-funcionario.component';
import { GrowlModule } from 'primeng/primeng';

const rotas = [{ path: '', component: DetalheFuncionarioComponent }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GrowlModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [DetalheFuncionarioComponent],
  providers: [FuncionarioService],
  exports: []
})
export class DetalheFuncionarioModule { }
