import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroModalidadeTurmaComponent } from './cadastro-modalidade-turma.component';
import { TurmaService } from './../servicos/turma.service';


const rotas = [ { path: '', component: CadastroModalidadeTurmaComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [CadastroModalidadeTurmaComponent],
  providers: [TurmaService],
  exports: []
})
export class CadastroModalidadeTurmaModule { }
