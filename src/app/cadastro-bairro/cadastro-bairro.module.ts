import { BairroService } from './../servicos/bairro.service';
import { RouterModule } from '@angular/router';
import { GrowlModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { CadastroBairroComponent } from './cadastro-bairro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const rotas = [ { path: '', component: CadastroBairroComponent } ];

@NgModule({
  imports: [
     CommonModule,
    FormsModule,
    GrowlModule,
    RouterModule.forChild(rotas)
  ],
   declarations: [CadastroBairroComponent],
  providers: [BairroService],
  exports: []
})
export class CadastroBairroModule { }
