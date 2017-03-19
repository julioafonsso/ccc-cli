import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'rxjs/Rx';

import { AppComponent } from './app.component';
import { MenuModule } from './menu/menu.module';
import { AppRoutingModule } from './app.routing.module'
import { HomeComponent } from './home/home.component';

import { HttpCustormerService } from './servicos/http-custormer.service';
import { LoginService } from './servicos/login.service';

import { PerfilSupervisorGuard } from './guards/perfil-supervisor.guard';
import { EstaLogadoGuard } from './guards/esta-logado.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MenuModule,
    AppRoutingModule
  ],
  exports: [],
  providers: [LoginService, EstaLogadoGuard, PerfilSupervisorGuard, HttpCustormerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
