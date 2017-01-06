import { routing } from './../app.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaAlunosComponent } from './consulta-alunos.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [ConsultaAlunosComponent]
})
export class ConsultaAlunosModule { }
