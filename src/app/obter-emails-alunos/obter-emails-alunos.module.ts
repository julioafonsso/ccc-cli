import { EmailService } from './../servicos/email-service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObterEmailsAlunosComponent } from './obter-emails-alunos.component';
import { TurmaService } from 'app/servicos/turma.service';

const rotas = [ { path: '', component: ObterEmailsAlunosComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [ObterEmailsAlunosComponent],
  providers: [EmailService, TurmaService],  
  exports: []
})
export class ObterEmailsAlunosModule { }
