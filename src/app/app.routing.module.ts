import { NgModule } from '@angular/core';
import { ConsultaAlunosModule } from './consulta-alunos/consulta-alunos.module';
import { Routes, RouterModule } from '@angular/router';

import { EstaLogadoGuard } from './guards/esta-logado.guard';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
    { path: '', loadChildren: 'app/home/home.module#HomeModule', canActivate: [EstaLogadoGuard] },
    { path: 'envio-email', loadChildren: 'app/envio-email/envio-email.module#EnvioEmailModule', canActivate: [EstaLogadoGuard] },
    { path: 'consulta-alunos', loadChildren: 'app/consulta-alunos/consulta-alunos.module#ConsultaAlunosModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-aluno', loadChildren: './cadastro-aluno/cadastro-aluno.module#CadastroAlunoModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-aluno/:id', loadChildren: './cadastro-aluno/cadastro-aluno.module#CadastroAlunoModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-professor', loadChildren: './cadastro-professor/cadastro-professor.module#CadastroProfessorModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-professor/:id', loadChildren: './cadastro-professor/cadastro-professor.module#CadastroProfessorModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-turma', loadChildren: './cadastro-turma/cadastro-turma.module#CadastroTurmaModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-turma/:id', loadChildren: './cadastro-turma/cadastro-turma.module#CadastroTurmaModule', canActivate: [EstaLogadoGuard] },
    { path: 'lancamento-movimentacao-caixa', loadChildren: './lancamento-movimentacao-caixa/lancamento-movimentacao-caixa.module#LancamentoMovimentacaoCaixaModule', canActivate: [EstaLogadoGuard] },
    { path: 'lancamento-movimentacao-caixa/:id', loadChildren: './lancamento-movimentacao-caixa/lancamento-movimentacao-caixa.module#LancamentoMovimentacaoCaixaModule', canActivate: [EstaLogadoGuard] },
    { path: 'consulta-aluno-debito', loadChildren: './consulta-alunos-debito/consulta-alunos-debito.module#ConsultaAlunosDebitoModule', canActivate: [EstaLogadoGuard] },
    { path: 'consulta-turmas', loadChildren: './consulta-turmas/consulta-turmas.module#ConsultaTurmasModule', canActivate: [EstaLogadoGuard] },
    { path: 'consulta-turmas-excluidas', loadChildren: './consulta-turmas-excluidas/consulta-turmas-excluidas.module#ConsultaTurmasExcluidasModule', canActivate: [EstaLogadoGuard] },
    { path: 'detalhe-aluno/:id', loadChildren: './detalhe-aluno/detalhe-aluno.module#DetalheAlunoModule', canActivate: [EstaLogadoGuard] },
    { path: 'consulta-professores', loadChildren: './consulta-professores/consulta-professores.module#ConsultaProfessoresModule', canActivate: [EstaLogadoGuard] },
    { path: 'detalhe-professor/:id', loadChildren: './detalhe-professor/detalhe-professor.module#DetalheProfessorModule', canActivate: [EstaLogadoGuard] },
    { path: 'relatorio-movimentacao-caixa', loadChildren: './relatorio-movimentacao-caixa/relatorio-movimentacao-caixa.module#RelatorioMovimentacaoCaixaModule', canActivate: [EstaLogadoGuard] },
    { path: 'consulta-tipo-desconto', loadChildren: './consulta-tipo-desconto/consulta-tipo-desconto.module#ConsultaTipoDescontoModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-tipo-desconto', loadChildren: './cadastro-tipo-desconto/cadastro-tipo-desconto.module#CadastroTipoDescontoModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-tipo-desconto/:id', loadChildren: './cadastro-tipo-desconto/cadastro-tipo-desconto.module#CadastroTipoDescontoModule', canActivate: [EstaLogadoGuard] },
    { path: 'consulta-tipo-fluxo', loadChildren: './consulta-tipo-fluxo/consulta-tipo-fluxo.module#ConsultaTipoFluxoModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-tipo-fluxo-caixa', loadChildren: './cadastro-tipo-fluxo-caixa/cadastro-tipo-fluxo-caixa.module#CadastroTipoFluxoCaixaModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-tipo-fluxo-caixa/:id', loadChildren: './cadastro-tipo-fluxo-caixa/cadastro-tipo-fluxo-caixa.module#CadastroTipoFluxoCaixaModule', canActivate: [EstaLogadoGuard] },
    { path: 'consulta-modalidade-turma', loadChildren: './consulta-modalidade-turma/consulta-modalidade-turma.module#ConsultaModalidadeTurmaModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-modalidade-turma', loadChildren: './cadastro-modalidade-turma/cadastro-modalidade-turma.module#CadastroModalidadeTurmaModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-modalidade-turma/:id', loadChildren: './cadastro-modalidade-turma/cadastro-modalidade-turma.module#CadastroModalidadeTurmaModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-mensagem-email', loadChildren: './cadastro-mensagem-email/cadastro-mensagem-email.module#CadastroMensagemEmailTurmaModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-workshop', loadChildren: './cadastro-workshop/cadastro-workshop.module#CadastroWorkshopModule', canActivate: [EstaLogadoGuard] },
    { path: 'consulta-workshop', loadChildren: './consulta-workshop/consulta-workshop.module#ConsultaWorkshopModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-workshop/:id', loadChildren: './cadastro-workshop/cadastro-workshop.module#CadastroWorkshopModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-funcionario', loadChildren: './cadastro-funcionario/cadastro-funcionario.module#CadastroFuncionarioModule', canActivate: [EstaLogadoGuard] },
    { path: 'consulta-funcionario', loadChildren: './consulta-funcionario/consulta-funcionario.module#ConsultaFuncionarioModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-funcionario/:id', loadChildren: './cadastro-funcionario/cadastro-funcionario.module#CadastroFuncionarioModule', canActivate: [EstaLogadoGuard] },
    { path: 'detalhe-funcionario/:id', loadChildren: './detalhe-funcionario/detalhe-funcionario.module#DetalheFuncionarioModule', canActivate: [EstaLogadoGuard] },
    { path: 'obter-email-alunos', loadChildren: './obter-emails-alunos/obter-emails-alunos.module#ObterEmailsAlunosModule', canActivate: [EstaLogadoGuard] },
    { path: 'supervisao', loadChildren: './supervisao/supervisao.module#SupervisaoModule' },
    { path: 'detalhe-turma/:id', loadChildren: './detalhe-turma/detalhe-turma.module#DetalheTurmaModule', canActivate: [EstaLogadoGuard] },

    { path: 'login', loadChildren: './login/login.module#LoginModule', canActivate: [] }




];





@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})
export class AppRoutingModule { }
