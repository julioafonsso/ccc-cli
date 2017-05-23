
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WorkshopService } from './../servicos/workshop.service';
import { ConsultaWorkshopComponent } from './consulta-workshop.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessorService } from './../servicos/professor.service';

const rotas = [ { path: '', component: ConsultaWorkshopComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [ConsultaWorkshopComponent],
  providers: [ WorkshopService],
  exports: []
})
export class ConsultaWorkshopModule { }
