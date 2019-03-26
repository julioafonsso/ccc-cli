import { SupervisaoService } from './../servicos/supervisao.service';
import { RouterModule } from '@angular/router';
import { GrowlModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupervisaoComponent } from './supervisao.component';

const rotas = [ { path: '', component: SupervisaoComponent } ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GrowlModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [SupervisaoComponent],
  providers: [ SupervisaoService ],
  exports: []
})
export class SupervisaoModule { }
