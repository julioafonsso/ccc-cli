import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaTurmasComponent } from './consulta-turmas.component';
import { routing } from './../app.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [ConsultaTurmasComponent]
})
export class ConsultaTurmasModule { }
