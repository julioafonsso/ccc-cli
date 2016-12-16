import { TipoDescontoModule } from './modulos/tipo-desconto.module';
import { MovimentacaoCaixaModule } from './modulos/movimentacao-caixa.module';
import { TurmaModule } from './modulos/turma.module';
import { TipoTurmaModule } from './modulos/tipo-turma.module';
import { TipoFluxoCaixaModule } from './modulos/tipo-fluxo-caixa.module';
import { ProfessorModule } from './modulos/professor.module';
import { AlunoModule } from './modulos/aluno.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'rxjs/Rx';

// import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { AppComponent } from './app.component';
import { MenuModule } from './menu/menu.module';

import { LoginModule } from './login/login.module';

import { routing } from './app.routing';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MenuModule,
    LoginModule,
    TipoFluxoCaixaModule,
    AlunoModule,
    ProfessorModule,
    TipoTurmaModule,
    TurmaModule,
    MovimentacaoCaixaModule,
    TipoDescontoModule,
    // NKDatetimeModule,
    routing
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
