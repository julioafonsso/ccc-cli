import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FuncionarioService } from './../servicos/funcionario.service';
import { ConsultaFuncionarioComponent } from './consulta-funcionario.component';


const rotas = [ { path: '', component: ConsultaFuncionarioComponent } ];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [ConsultaFuncionarioComponent],
  providers: [FuncionarioService],
  exports: []
})


export class ConsultaFuncionarioModule { }
