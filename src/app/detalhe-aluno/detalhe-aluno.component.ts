import { DatePipe } from '@angular/common';
import { Message } from 'primeng/primeng';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


import { TurmaService } from './../servicos/turma.service';
import { ProfessorService } from './../servicos/professor.service';
import { Professor } from './../models/professor';
import { ModalidadeTurma } from './../models/modalidade-turma';
import { Turma } from './../models/turma';
import { AlunoService } from './../servicos/aluno.service';
import { Aluno } from './../models/aluno';
import { Mensalidade } from './../models/mensalidade';
import { Matricula } from './../models/maticula';

@Component({
  selector: 'app-detalhe-aluno',
  templateUrl: './detalhe-aluno.component.html',
  styleUrls: ['./detalhe-aluno.component.scss']
})
export class DetalheAlunoComponent implements OnInit {

  private inscricao: Subscription;
  private idAluno: number;
  private aluno: Aluno;
  private matriculas: Matricula[];
  private debitos: Mensalidade[];
  private histAulaParticular: Mensalidade[];
  private histPagamento: Mensalidade[];
  private botoes = new Array();
  private msgs: Message[];
  private submit: boolean;
  private dataInicio: string;
  private dataFim: string;
  private professores: Professor[];
  private modalidades: ModalidadeTurma[];
  private qtdAulas: number;
  private aula: Turma;


  constructor(private alunoService: AlunoService,private turmaService: TurmaService,
    private professorService: ProfessorService, private route: ActivatedRoute) {
    this.msgs = [];
    this.aluno = new Aluno();
    this.botoes = new Array();
    this.submit = false;
    this.initDatas();
    this.aula = new Turma();
  }

  ngOnInit() {
    this.botoes[0] = true;
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.idAluno = params['id'];
        this.loadAluno();
        this.loadTurmas();
        this.loadDebitos();
        this.pesquisarHistPagamento();
        this.pesquisarAulasParticulares();
      }
    );

    this.turmaService.getModalidades().subscribe(res => {
      this.modalidades = res;
    })


    this.professorService.getProfessores().subscribe(res => {
      this.professores = res;
    })
  }

  resetCadastroAulaParticular(){
    this.qtdAulas = null;
    this.turmaService.getModalidades().subscribe(res => {
      this.modalidades = res;
    })


    this.professorService.getProfessores().subscribe(res => {
      this.professores = res;
    })

    this.aula = new Turma();
  }

  cadastrarAulaParticular(){
    this.submit = true;
    this.alunoService.cadastrarAulaParticular(this.aula, this.idAluno, this.qtdAulas).subscribe(response => {
                this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
                this.loadAulasParticulares();
                this.resetCadastroAulaParticular();
                this.submit = false;
            },
            error => {
                this.submit = false;
                this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
            });
  }

  initDatas() {
    let dp = new DatePipe("yyyy-MM");
    this.dataFim = dp.transform(Date.now(), "yyyy-MM");
    let valores = this.dataFim.split("-");
    let ano = new Number(valores[0]).valueOf()
    let mes = new Number(valores[1]).valueOf()

    mes -= 6;

    if (mes < 1) {
      mes = 12 + mes;
      ano -= 1;
    }

    if (mes.toString().length === 1)
      this.dataInicio = ano.toString() + "-0" + mes.toString();
    else
      this.dataInicio = ano.toString() + "-" + mes.toString();

  }



  pesquisarHistPagamento() {
    if (this.dataInicio == undefined || this.dataInicio.toString().length < 7) {
      this.msgs.push({ severity: 'error', summary: 'Pesquisa Com Erro !', detail: "Selecionar Data Inicio" });
    }
    else if (this.dataFim == undefined || this.dataFim.toString().length < 7) {
      this.msgs.push({ severity: 'error', summary: 'Pesquisa Com Erro !', detail: "Selecionar Data Fim" });
    }
    else {
      this.loadPagamentos();
    }
  }

  pesquisarAulasParticulares() {
    if (this.dataInicio == undefined || this.dataInicio.toString().length < 7) {
      this.msgs.push({ severity: 'error', summary: 'Pesquisa Com Erro !', detail: "Selecionar Data Inicio" });
    }
    else if (this.dataFim == undefined || this.dataFim.toString().length < 7) {
      this.msgs.push({ severity: 'error', summary: 'Pesquisa Com Erro !', detail: "Selecionar Data Fim" });
    }
    else {
      this.loadAulasParticulares();
    }
  }

  loadAulasParticulares() {
    this.alunoService.getAulasParticulares(this.idAluno, this.dataInicio, this.dataFim).subscribe(res => {
      console.log(res);
      this.histAulaParticular = res;
    })
  }


  loadPagamentos() {
    this.alunoService.getPagamentos(this.idAluno, this.dataInicio, this.dataFim).subscribe(res => {
      this.histPagamento = res;
    })
  }

  loadTurmas() {
    this.alunoService.getMatriculas(this.idAluno).subscribe(res => {
      this.matriculas = res;
    })
  }

  loadAluno() {
    this.alunoService.getAluno(this.idAluno).subscribe(res => {
      this.aluno = res;
    })
  }

  loadDebitos() {
    this.alunoService.getDebitos(this.idAluno).subscribe(res => {
      this.debitos = res;
      this.submit = false;
    })
  }

  getTabAtiva(x: number) {
    let retorno: boolean;
    retorno = this.botoes[x];
    return retorno;
  }

  tab(valor: number) {
    this.botoes = new Array();
    this.botoes[valor] = true;
  }


  pagar(mensalidade: Mensalidade) {
    this.submit = true;
    this.alunoService.pagarMensalidade(mensalidade).subscribe(res => {
      this.msgs.push({ severity: 'success', summary: 'Pagamento Com Sucesso !' });
      this.loadDebitos();
      this.loadPagamentos()
    }, error => {
      this.msgs.push({ severity: 'error', summary: JSON.parse(error)["message"] });
      this.submit = false;
    });

  }

  pagarMensalidade(mensalidade: Mensalidade) {
    mensalidade.valorParaPagar = mensalidade.valorMensalidade;
    this.pagar(mensalidade);
  }

  pagarMensalidadeCalculada(mensalidade: Mensalidade) {
    mensalidade.valorParaPagar = mensalidade.valorCalculado;
    this.pagar(mensalidade);

  }

}
