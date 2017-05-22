import { ConsultaMensalidades } from './../models/consulta-mensalidades';
import { TipoDesconto } from './../models/tipo-desconto';
import { DescontoService } from './../servicos/desconto.service';
import { CadastroMatricula } from './../models/cadastro-matricula';
import { ConsultaMatricula } from './../models/consulta-matricula';
import { ConsultaTurma } from './../models/consulta-turmas';
import { ConsultaAlunos } from './../models/consulta-alunos';
import { ConsultaProfessor } from './../models/consulta-professor';
import { DatePipe } from '@angular/common';
import { Message } from 'primeng/primeng';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


import { TurmaService } from './../servicos/turma.service';
import { ProfessorService } from './../servicos/professor.service';
import { ModalidadeTurma } from './../models/modalidade-turma';
import { AlunoService } from './../servicos/aluno.service';

@Component({
  selector: 'app-detalhe-aluno',
  templateUrl: './detalhe-aluno.component.html',
  styleUrls: ['./detalhe-aluno.component.scss']
})
export class DetalheAlunoComponent implements OnInit {

  private inscricao: Subscription;
  private idAluno: number;
  private aluno: ConsultaAlunos;
  private botoes = new Array();
  private msgs: Message[];
  private submit: boolean;
  private dataInicio: string;
  private dataFim: string;
  private professores: ConsultaProfessor[];
  private modalidades: ModalidadeTurma[];
  private qtdAulas: number;
  private turmas: ConsultaTurma[]
  private matriculas: ConsultaMatricula[];
  private matricula: CadastroMatricula;
  private descontos: TipoDesconto[];
  private debitos: ConsultaMensalidades[];
  private histPagamento: ConsultaMensalidades[];

  constructor(private alunoService: AlunoService, private turmaService: TurmaService,
    private professorService: ProfessorService, private descontoService: DescontoService, private route: ActivatedRoute) {
    this.msgs = [];
    this.aluno = new ConsultaAlunos();
    this.botoes = new Array();
    this.submit = false;
    this.initDatas();
    this.matricula = new CadastroMatricula();
  }

  ngOnInit() {
    this.botoes[0] = true;
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.idAluno = params['id'];
        this.loadAluno();
        this.loadMatriculas();
        this.loadTurmasColetivas();
        this.loadDebitos();
        this.pesquisarHistPagamento();
        // this.pesquisarAulasParticulares();
      }
    );

    this.descontoService.obterDescontos().subscribe(res => {
      this.descontos = res;
    })

    this.turmaService.getModalidades().subscribe(res => {
      this.modalidades = res;
    })


    this.professorService.getProfessores().subscribe(res => {
      this.professores = res;
    })
  }

  matricular() {
    this.matricula.idAluno = this.idAluno;
    this.turmaService.matricularAluno(this.matricula).subscribe(res => {
      this.matricula = new CadastroMatricula();
      this.loadMatriculas();
      this.loadDebitos();
    })

  }

  resetCadastroAulaParticular() {
    this.qtdAulas = null;
    this.turmaService.getModalidades().subscribe(res => {
      this.modalidades = res;
    })


    this.professorService.getProfessores().subscribe(res => {
      this.professores = res;
    })

    // this.aula = new Turma();
  }

  loadMatriculas() {
    this.alunoService.getMatriculas(this.idAluno).subscribe(res => {
      this.matriculas = res;
    })
  }

  loadTurmasColetivas() {
    this.turmaService.getTurmas().subscribe(res => {
      this.turmas = res;
    })
  }

  // cadastrarAulaParticular(){
  //   this.submit = true;
  //   this.alunoService.cadastrarAulaParticular(this.aula, this.idAluno, this.qtdAulas).subscribe(response => {
  //               this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
  //               this.loadAulasParticulares();
  //               this.resetCadastroAulaParticular();
  //               this.submit = false;
  //           },
  //           error => {
  //               this.submit = false;
  //               this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
  //           });
  // }

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


  pagar(idMensalidade: number, valor: number) {
    this.submit = true;
    this.alunoService.pagarMensalidade(idMensalidade, valor, this.idAluno).subscribe(res => {
      this.msgs.push({ severity: 'success', summary: 'Pagamento Com Sucesso !' });
      this.loadDebitos();
      this.loadPagamentos()
    }, error => {
      this.msgs.push({ severity: 'error', summary: JSON.parse(error)["message"] });
      this.submit = false;
    });

  }

  pagarMensalidade(mensalidade: ConsultaMensalidades) {
    this.pagar(mensalidade.id, mensalidade.valorMensalidade);
  }

  pagarMensalidadeCalculada(mensalidade: ConsultaMensalidades) {
    this.pagar(mensalidade.id, mensalidade.valorCalculado);

  }

}
