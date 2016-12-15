import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { AppComponent } from './app.component';
import { MenuModule } from './menu/menu.module';

import { LoginModule } from './login/login.module';
import { CadastroTipoFluxoCaixaModule } from './cadastro-tipo-fluxo-caixa/cadastro-tipo-fluxo-caixa.module';
import { RelatorioPagamentoProfessorModule } from './relatorio-pagamento-professor/relatorio-pagamento-professor.module';
import { RelatorioMovimentacaoCaixaModule } from './relatorio-movimentacao-caixa/relatorio-movimentacao-caixa.module';
import { LancamentoMovimentacaoCaixaModule } from './lancamento-movimentacao-caixa/lancamento-movimentacao-caixa.module';
import { ConsultaAlunosDebitoModule } from './consulta-alunos-debito/consulta-alunos-debito.module';
import { CadastroTurmaModule } from './cadastro-turma/cadastro-turma.module';
import { CadastroTipoTurmaModule } from './cadastro-tipo-turma/cadastro-tipo-turma.module';
import { CadastroProfessorModule } from './cadastro-professor/cadastro-professor.module';
import { CadastroAlunoModule } from './cadastro-aluno/cadastro-aluno.module';
import { CadastroTipoDescontoModule } from './cadastro-tipo-desconto/cadastro-tipo-desconto.module';


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
    CadastroTipoFluxoCaixaModule,
    CadastroAlunoModule,
    CadastroProfessorModule,
    CadastroTipoTurmaModule,
    CadastroTurmaModule,
    ConsultaAlunosDebitoModule,
    LancamentoMovimentacaoCaixaModule,
    RelatorioMovimentacaoCaixaModule,
    RelatorioPagamentoProfessorModule,
    CadastroTipoDescontoModule,
    // NKDatetimeModule,
    routing
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
