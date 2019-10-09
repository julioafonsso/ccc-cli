import { AlunoService } from './../servicos/aluno.service';
import { HomeComponent } from './home.component';
import { EmailService } from './../servicos/email-service';
import { RouterModule } from '@angular/router';
import { GrowlModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';

const rotas = [ { path: '', component: HomeComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GrowlModule,
    FileUploadModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [HomeComponent],
  providers: [ AlunoService ],
  exports: []
})
export class HomeModule { }
