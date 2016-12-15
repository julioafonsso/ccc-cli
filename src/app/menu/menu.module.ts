
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MaterialModule } from '@angular/material';
import { routing } from './../app.routing';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    routing
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})
export class MenuModule { }
