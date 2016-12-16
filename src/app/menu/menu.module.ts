
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { routing } from './../app.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})
export class MenuModule { }
