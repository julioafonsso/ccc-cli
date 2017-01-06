import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManutencaoTurmaComponent } from './manutencao-turma.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ManutencaoTurmaComponent]
})
export class ManutencaoTurmaModule { }
