import { NgModule } from '@angular/core';
import { ConsultaAlunosModule } from './consulta-alunos/consulta-alunos.module';
import { Routes, RouterModule } from '@angular/router';

import { PerfilSupervisorGuard } from './guards/perfil-supervisor.guard';
import { EstaLogadoGuard } from './guards/esta-logado.guard';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent,  canActivate: [EstaLogadoGuard] },
    { path: 'consulta-alunos', loadChildren: 'app/consulta-alunos/consulta-alunos.module#ConsultaAlunosModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-aluno', loadChildren: './cadastro-aluno/cadastro-aluno.module#CadastroAlunoModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-professor', loadChildren: './cadastro-professor/cadastro-professor.module#CadastroProfessorModule', canActivate: [EstaLogadoGuard] },
    { path: 'cadastro-turma', loadChildren: './cadastro-turma/cadastro-turma.module#CadastroTurmaModule', canActivate: [EstaLogadoGuard] },
    { path: 'lancamento-movimentacao-caixa', loadChildren: './lancamento-movimentacao-caixa/lancamento-movimentacao-caixa.module#LancamentoMovimentacaoCaixaModule', canActivate: [EstaLogadoGuard] },
    { path: 'consulta-aluno-debito', loadChildren: './consulta-alunos-debito/consulta-alunos-debito.module#ConsultaAlunosDebitoModule', canActivate: [EstaLogadoGuard] },
    { path: 'consulta-turmas', loadChildren: './consulta-turmas/consulta-turmas.module#ConsultaTurmasModule', canActivate: [EstaLogadoGuard] },
    { path: 'manutencao-turma/:id', loadChildren: './manutencao-turma/manutencao-turma.module#ManutencaoTurmaModule', canActivate: [EstaLogadoGuard] },
    { path: 'detalhe-aluno/:id', loadChildren: './detalhe-aluno/detalhe-aluno.module#DetalheAlunoModule', canActivate: [EstaLogadoGuard] },
    { path: 'consulta-professores', loadChildren: './consulta-professores/consulta-professores.module#ConsultaProfessoresModule', canActivate: [EstaLogadoGuard] },
    { path: 'detalhe-professor/:id', loadChildren: './detalhe-professor/detalhe-professor.module#DetalheProfessorModule', canActivate: [EstaLogadoGuard] },
    

    { path: 'relatorio-movimentacao-caixa', loadChildren: './relatorio-movimentacao-caixa/relatorio-movimentacao-caixa.module#RelatorioMovimentacaoCaixaModule', canActivate: [EstaLogadoGuard, PerfilSupervisorGuard] },
    { path: 'cadastro-tipo-desconto', loadChildren: './cadastro-tipo-desconto/cadastro-tipo-desconto.module#CadastroTipoDescontoModule', canActivate: [EstaLogadoGuard, PerfilSupervisorGuard] },
    { path: 'cadastro-tipo-fluxo-caixa', loadChildren: './cadastro-tipo-fluxo-caixa/cadastro-tipo-fluxo-caixa.module#CadastroTipoFluxoCaixaModule', canActivate: [EstaLogadoGuard, PerfilSupervisorGuard] },
    { path: 'cadastro-modalidade-turma', loadChildren: './cadastro-modalidade-turma/cadastro-modalidade-turma.module#CadastroModalidadeTurmaModule', canActivate: [EstaLogadoGuard, PerfilSupervisorGuard] },
    
    { path: 'login', loadChildren: './login/login.module#LoginModule', canActivate: [] }


];





@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})
export class AppRoutingModule { }
