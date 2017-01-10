import { routing } from './../app.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaProfessoresComponent } from './consulta-professores.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [ConsultaProfessoresComponent]
})
export class ConsultaProfessoresModule { }
