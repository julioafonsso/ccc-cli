import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroProfessorComponent } from './cadastro-professor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [CadastroProfessorComponent]
})
export class CadastroProfessorModule { }
