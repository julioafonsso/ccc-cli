import { WorkshopService } from './../servicos/workshop.service';
import { DescontoService } from './../servicos/desconto.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { GrowlModule, ConfirmDialogModule, ConfirmationService, CalendarModule } from 'primeng/primeng';
import { AlunoService } from './../servicos/aluno.service';
import { DetalheAlunoComponent } from './detalhe-aluno.component';
import { TurmaService } from './../servicos/turma.service';
import { ProfessorService } from './../servicos/professor.service';
import { ValorModule } from './../diretivas/valor/valor.module';

const rotas = [ { path: '', component: DetalheAlunoComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GrowlModule,
    ValorModule,
    CalendarModule,
    ConfirmDialogModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [DetalheAlunoComponent],
  providers: [AlunoService, ProfessorService, TurmaService, DescontoService, WorkshopService, ConfirmationService,DatePipe],  
  exports: []
})
export class DetalheAlunoModule { }
