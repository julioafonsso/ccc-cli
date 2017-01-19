import { NgModule } from '@angular/core';
import { ConsultaAlunosModule } from './consulta-alunos/consulta-alunos.module';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [

    { path: 'consulta-alunos', loadChildren: 'app/consulta-alunos/consulta-alunos.module#ConsultaAlunosModule' },
    { path: 'cadastro-tipo-desconto', loadChildren: './cadastro-tipo-desconto/cadastro-tipo-desconto.module#CadastroTipoDescontoModule' },
    { path: 'cadastro-tipo-fluxo-caixa', loadChildren: './cadastro-tipo-fluxo-caixa/cadasstro-tipo-fluxo-caixa.module#CadastroTipoFluxoCaixaModule' },
    { path: 'cadastro-modalidade-turma', loadChildren: './cadastro-modalidade-turma/cadastro-modalidade-turma.module#CadastroModalidadeTurmaModule' },
    { path: 'cadastro-aluno', loadChildren: './cadastro-aluno/cadastro-aluno.module#CadastroAlunoModule' },
    { path: 'cadastro-professor', loadChildren: './cadastro-professor/cadastro-professor.module#CadastroProfessorModule' },
    { path: 'cadastro-turma', loadChildren: './cadastro-turma/cadastro-turma.module#CadastroTurmaModule' },
    { path: 'lancamento-movimentacao-caixa', loadChildren: './lancamento-movimentacao-caixa/lancamento-movimentacao-caixa.module#LancamentoMovimentacaoCaixaModule' },
    { path: 'consulta-aluno-debito', loadChildren: './consulta-alunos-debito/consulta-alunos-debito.module#ConsultaAlunosDebitoModule' },
    { path: 'relatorio-movimentacao-caixa', loadChildren: './relatorio-movimentacao-caixa/relatorio-movimentacao-caixa.module#RelatorioMovimentacaoCaixaModule' },
    { path: 'consulta-turmas', loadChildren: './consulta-turmas/consulta-turmas.module#ConsultaTurmasModule' },
    { path: 'manutencao-turma/:id' , loadChildren: './manutencao-turma/manutencao-turma.module#ManutencaoTurmaModule' },
    { path: 'detalhe-aluno/:id', loadChildren: './detalhe-aluno/detalhe-aluno.module#DetalheAlunoModule'},
    { path: 'consulta-professores', loadChildren: './consulta-professores/consulta-professores.module#ConsultaProfessoresModule'},
    { path: 'detalhe-professor/:id', loadChildren: './detalhe-professor/detalhe-professor.module#DetalheProfessorModule'}

];





@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
    
})
export class AppRoutingModule { }
