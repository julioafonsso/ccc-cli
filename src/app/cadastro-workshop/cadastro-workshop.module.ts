

import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrowlModule } from 'primeng/primeng';
import { CadastroWorkshopComponent } from './cadastro-workshop.component';
import { WorkshopService } from './../servicos/workshop.service';
import { ProfessorService } from './../servicos/professor.service';
import { ValorModule } from './../diretivas/valor/valor.module';

const rotas = [ { path: '', component: CadastroWorkshopComponent } ];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GrowlModule,
    ValorModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [CadastroWorkshopComponent],
  providers: [WorkshopService, ProfessorService],
  exports: []
})
export class CadastroWorkshopModule { }
