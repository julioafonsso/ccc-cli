import { DetalheProfessorComponent } from './detalhe-professor/detalhe-professor.component';
import { ConsultaProfessoresComponent } from './consulta-professores/consulta-professores.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from "@angular/router";


import { ConsultaAlunosComponent } from './consulta-alunos/consulta-alunos.component';
import { DetalheAlunoComponent } from './detalhe-aluno/detalhe-aluno.component';
import { RelatorioMovimentacaoCaixaComponent } from './relatorio-movimentacao-caixa/relatorio-movimentacao-caixa.component';
import { LancamentoMovimentacaoCaixaComponent } from './lancamento-movimentacao-caixa/lancamento-movimentacao-caixa.component';
import { ConsultaAlunosDebitoComponent } from './consulta-alunos-debito/consulta-alunos-debito.component';
import { CadastroTurmaComponent } from './cadastro-turma/cadastro-turma.component';
import { CadastroModalidadeTurmaComponent } from './cadastro-modalidade-turma/cadastro-modalidade-turma.component'
import { CadastroProfessorComponent } from './cadastro-professor/cadastro-professor.component';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno.component';
import { CadastroTipoFluxoCaixaComponent } from './cadastro-tipo-fluxo-caixa/cadastro-tipo-fluxo-caixa.component';
import { CadastroTipoDescontoComponent } from './cadastro-tipo-desconto/cadastro-tipo-desconto.component';
import { ConsultaTurmasComponent } from './consulta-turmas/consulta-turmas.component';
import { ManutencaoTurmaComponent } from './manutencao-turma/manutencao-turma.component';


const ROTAS = [
    { path: 'cadastro-tipo-desconto', component: CadastroTipoDescontoComponent },
    { path: 'cadastro-tipo-fluxo-caixa', component: CadastroTipoFluxoCaixaComponent },
    { path: 'cadastro-modalidade-turma', component: CadastroModalidadeTurmaComponent },
    { path: 'cadastro-aluno', component: CadastroAlunoComponent },
    { path: 'cadastro-professor', component: CadastroProfessorComponent },
    { path: 'cadastro-turma', component: CadastroTurmaComponent },
    { path: 'lancamento-movimentacao-caixa', component: LancamentoMovimentacaoCaixaComponent },
    { path: 'consulta-aluno-debito', component: ConsultaAlunosDebitoComponent },
    { path: 'relatorio-movimentacao-caixa', component: RelatorioMovimentacaoCaixaComponent },
    { path: 'consulta-turmas', component: ConsultaTurmasComponent },
    { path: 'manutencao-turma/:id' , component: ManutencaoTurmaComponent },
    { path: 'detalhe-aluno/:id', component: DetalheAlunoComponent},
    { path: 'consulta-alunos', component: ConsultaAlunosComponent},
    { path: 'consulta-professores', component: ConsultaProfessoresComponent},
    { path: 'detalhe-professor/:id', component: DetalheProfessorComponent}

];

export const routing: ModuleWithProviders = RouterModule.forRoot(ROTAS);
