import { TurmaService } from './../servicos/turma.service';
import { RouterModule } from '@angular/router';
import { GrowlModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalheTurmaComponent } from './detalhe-turma.component';

const rotas = [{ path: '', component: DetalheTurmaComponent }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GrowlModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [DetalheTurmaComponent],
  providers: [TurmaService],
  exports: []
})
export class DetalheTurmaModule { }
