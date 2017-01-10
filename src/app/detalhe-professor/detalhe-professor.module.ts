import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalheProfessorComponent } from './detalhe-professor.component';
import { routing } from './../app.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [DetalheProfessorComponent]
})
export class DetalheProfessorModule { }
