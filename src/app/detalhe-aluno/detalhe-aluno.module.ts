import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './../app.routing';


import { DetalheAlunoComponent } from './detalhe-aluno.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [DetalheAlunoComponent]
})
export class DetalheAlunoModule { }
