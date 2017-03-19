import { ValorModule } from './../diretivas/valor/valor.module';
import { DescontoService } from './../servicos/desconto.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrowlModule } from 'primeng/primeng';
import { ProfessorService } from './../servicos/professor.service';
import { ManutencaoTurmaComponent } from './manutencao-turma.component';
import { AlunoService } from './../servicos/aluno.service';
import { TurmaService } from './../servicos/turma.service';

const rotas = [ { path: '', component: ManutencaoTurmaComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GrowlModule,
    ValorModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [ManutencaoTurmaComponent],
  providers: [TurmaService, AlunoService, ProfessorService, DescontoService],
  exports: []
})
export class ManutencaoTurmaModule { }
