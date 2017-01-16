import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroModalidadeTurmaComponent } from './cadastro-modalidade-turma.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [CadastroModalidadeTurmaComponent]
})
export class CadastroModalidadeTurmaModule { }
