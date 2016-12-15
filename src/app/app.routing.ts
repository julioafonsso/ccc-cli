
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from "@angular/router";


import { RelatorioPagamentoProfessorComponent } from './relatorio-pagamento-professor/relatorio-pagamento-professor.component';
import { RelatorioMovimentacaoCaixaComponent } from './relatorio-movimentacao-caixa/relatorio-movimentacao-caixa.component';
import { LancamentoMovimentacaoCaixaComponent } from './lancamento-movimentacao-caixa/lancamento-movimentacao-caixa.component';
import { ConsultaAlunosDebitoComponent } from './consulta-alunos-debito/consulta-alunos-debito.component';
import { CadastroTurmaComponent } from './cadastro-turma/cadastro-turma.component';
import { CadastroTipoTurmaComponent } from './cadastro-tipo-turma/cadastro-tipo-turma.component';
import { CadastroProfessorComponent } from './cadastro-professor/cadastro-professor.component';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno.component';
import { CadastroTipoFluxoCaixaComponent } from './cadastro-tipo-fluxo-caixa/cadastro-tipo-fluxo-caixa.component';
import { CadastroTipoDescontoComponent } from './cadastro-tipo-desconto/cadastro-tipo-desconto.component';

const ROTAS = [
    { path: 'cadastro-tipo-desconto', component: CadastroTipoDescontoComponent },
    { path: 'cadastro-tipo-fluxo-caixa', component: CadastroTipoFluxoCaixaComponent },
    { path: 'cadastro-tipo-turma', component: CadastroTipoTurmaComponent },
    { path: 'cadastro-aluno', component: CadastroAlunoComponent },
    { path: 'cadastro-professor', component: CadastroProfessorComponent },
    { path: 'cadastro-turma', component: CadastroTurmaComponent },
    { path: 'lancamento-movimentacao-caixa', component: LancamentoMovimentacaoCaixaComponent },
    { path: 'consulta-aluno-debito', component: ConsultaAlunosDebitoComponent },
    { path: 'relatorio-movimentacao-caixa', component: RelatorioMovimentacaoCaixaComponent },
    { path: 'relatorio-pagamento-professor', component: RelatorioPagamentoProfessorComponent }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(ROTAS);
