import { MensagemEmailService } from './../servios/mensagem-email.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { GrowlModule } from 'primeng/primeng';
import { CadastroMensagemEmailComponent } from './cadastro-mensagem-email.component';


const rotas = [ { path: '', component: CadastroMensagemEmailComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GrowlModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [CadastroMensagemEmailComponent],
  providers: [MensagemEmailService],
  exports: []
})
export class CadastroMensagemEmailTurmaModule { }
