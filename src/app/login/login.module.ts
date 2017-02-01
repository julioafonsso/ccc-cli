import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LoginComponent } from './login.component';
// import { GrowlModule } from 'primeng/primeng';

const rotas = [{ path: '', component: LoginComponent }];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // GrowlModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [LoginComponent],
  providers:[],
  exports: [LoginComponent]

})
export class LoginModule { }
