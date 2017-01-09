import { CadastroModalidadeTurmaModule } from './cadastro-modalidade-turma/cadastro-modalidade-turma.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'rxjs/Rx';

import { AppComponent } from './app.component';
import { MenuModule } from './menu/menu.module';

import { LoginModule } from './login/login.module';

import { RelatorioMovimentacaoCaixaModule } from './relatorio-movimentacao-caixa/relatorio-movimentacao-caixa.module';
import { ManutencaoTurmaModule } from './manutencao-turma/manutencao-turma.module';
import { LancamentoMovimentacaoCaixaModule } from './lancamento-movimentacao-caixa/lancamento-movimentacao-caixa.module';
import { ConsultaTurmasModule } from './consulta-turmas/consulta-turmas.module';
import { ConsultaAlunosDebitoModule } from './consulta-alunos-debito/consulta-alunos-debito.module';
import { ConsultaAlunosModule } from './consulta-alunos/consulta-alunos.module';
import { CadastroTurmaModule } from './cadastro-turma/cadastro-turma.module';
import { CadastroTipoFluxoCaixaModule } from './cadastro-tipo-fluxo-caixa/cadasstro-tipo-fluxo-caixa.module';
import { CadastroTipoDescontoModule } from './cadastro-tipo-desconto/cadastro-tipo-desconto.module';
import { CadastroProfessorModule } from './cadastro-professor/cadastro-professor.module';
import { CadastroAlunoModule } from './cadastro-aluno/cadastro-aluno.module';
import { DetalheAlunoModule } from './detalhe-aluno/detalhe-aluno.module';


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
    CadastroAlunoModule,
    CadastroProfessorModule,
    CadastroTipoDescontoModule,
    CadastroTipoFluxoCaixaModule,
    CadastroModalidadeTurmaModule,
    CadastroTurmaModule,
    ConsultaAlunosModule,
    ConsultaAlunosDebitoModule,
    ConsultaTurmasModule,
    LancamentoMovimentacaoCaixaModule,
    ManutencaoTurmaModule,
    RelatorioMovimentacaoCaixaModule,
    DetalheAlunoModule,
    routing
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
