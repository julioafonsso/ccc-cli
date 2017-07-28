

import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Message } from 'primeng/primeng';

import { NivelTurma } from './../models/nivel-turma';
import { WorkshopService } from './../servicos/workshop.service';
import { ConsultaWorkShop } from './../models/consulta-workshop';
import { ConsultaAulaParticular } from './../models/consulta-aula-particular';
import { CadastroAulaParticular } from './../models/cadastro-aula-particular';
import { ConsultaMensalidades } from './../models/consulta-mensalidades';
import { TipoDesconto } from './../models/tipo-desconto';
import { DescontoService } from './../servicos/desconto.service';
import { CadastroMatricula } from './../models/cadastro-matricula';
import { ConsultaMatricula } from './../models/consulta-matricula';
import { ConsultaTurma } from './../models/consulta-turmas';
import { ConsultaAlunos } from './../models/consulta-alunos';
import { ConsultaProfessor } from './../models/consulta-professor';

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
  private aula: CadastroAulaParticular;
  private histAulaParticular: ConsultaAulaParticular[];
  private workShops: ConsultaWorkShop[];
  private matriculasWorkShops: ConsultaMatricula[];
  private niveis = new Array<NivelTurma>();

  private nivelSelecionado: NivelTurma;
  private modalidadeSelecionado: ModalidadeTurma;

  constructor(private alunoService: AlunoService, private turmaService: TurmaService,
    private professorService: ProfessorService, private descontoService: DescontoService, private route: ActivatedRoute,
    private workService: WorkshopService, private roteador: Router) {
    this.msgs = [];
    this.aluno = new ConsultaAlunos();
    this.botoes = new Array();
    this.submit = false;
    this.initDatas();
    this.matricula = new CadastroMatricula();
    this.aula = new CadastroAulaParticular();
    this.niveis = new Array<NivelTurma>();
    this.modalidades = new Array<ModalidadeTurma>() 
  }


  reset() {
    this.matricula = new CadastroMatricula();
    this.loadAluno();
    this.loadMatriculas();
    this.loadTurmasColetivas();
    this.loadDebitos();
    this.pesquisarHistPagamento();
    this.pesquisarAulasParticulares();
    this.pesquisarWorkShops();
  }

  ngOnInit() {
    this.botoes[0] = true;
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.idAluno = params['id'];
        this.reset();
      }
    );

    this.workService.getWorkShops().subscribe(res => {
      this.workShops = res;
    })

    this.descontoService.obterDescontos().subscribe(res => {
      this.descontos = res;
    })

   this.turmaService.getNiveis().subscribe(res => {
     this.niveis 
      this.niveis.push(new NivelTurma());
      res.forEach(element => {
        this.niveis.push(element);
      });

    })

    this.turmaService.getModalidades().subscribe(res => {
      this.modalidades.push(new ModalidadeTurma());
      res.forEach(element => {
        this.modalidades.push(element);
      });
    })

    this.professorService.getProfessores().subscribe(res => {
      this.professores = res;
    })
  }

  matricular() {
    this.matricula.idAluno = this.idAluno;
    this.turmaService.matricularAluno(this.matricula)
      .subscribe(res => {
        this.msgs.push({ severity: 'success', summary: 'Matriculado com Sucesso !' });
        
        this.reset();
      }, error => {
        this.msgs.push({ severity: 'error', summary: JSON.parse(error._body)["message"] });
        this.submit = false;
      });
  }

  resetCadastroAulaParticular() {
    this.qtdAulas = null;
    this.turmaService.getModalidades().subscribe(res => {
      this.modalidades = res;
    })

    this.professorService.getProfessores().subscribe(res => {
      this.professores = res;
    })

    this.aula = new CadastroAulaParticular();
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




  cadastrarAulaParticular() {
    this.alunoService.cadastrarAulaParticular(this.idAluno, this.aula).subscribe(response => {
      this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
      this.reset()
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

  pesquisarWorkShops() {
    if (this.dataInicio == undefined || this.dataInicio.toString().length < 7) {
      this.msgs.push({ severity: 'error', summary: 'Pesquisa Com Erro !', detail: "Selecionar Data Inicio" });
    }
    else if (this.dataFim == undefined || this.dataFim.toString().length < 7) {
      this.msgs.push({ severity: 'error', summary: 'Pesquisa Com Erro !', detail: "Selecionar Data Fim" });
    }
    else {
      this.loadWorkShops();
    }
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
      this.histAulaParticular = res;
    })
  }


  loadPagamentos() {
    this.alunoService.getPagamentos(this.idAluno, this.dataInicio, this.dataFim).subscribe(res => {
      this.histPagamento = res;
    })
  }

  loadWorkShops() {
    this.alunoService.getWorkShops(this.idAluno, this.dataInicio, this.dataFim).subscribe(res => {
      this.matriculasWorkShops = res;
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

  matricularWork(idTurma: number) {
    this.matricula = new CadastroMatricula();
    this.matricula.idAluno = this.idAluno;
    this.matricula.idTurma = idTurma;
    this.turmaService.matricularAluno(this.matricula).subscribe(res => {
      this.msgs.push({ severity: 'success', summary: 'Matriculado com Sucesso !' });
      this.reset();
    }, error => {
      this.msgs.push({ severity: 'error', summary: JSON.parse(error._body)["message"] });
      this.submit = false;
    });
  }

  pagar(idMensalidade: number, valor: number) {
    this.submit = true;
    this.alunoService.pagarMensalidade(idMensalidade, valor, this.idAluno).subscribe(res => {
      this.msgs.push({ severity: 'success', summary: 'Pagamento Com Sucesso !' });
      this.reset();
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

  alterarDesconto(matricula:ConsultaMatricula)
  {
    this.turmaService.alterarDesconto(matricula.id, matricula.idDesconto).subscribe(res =>{
      this.msgs.push({ severity: 'success', summary: 'Alteração Com Sucesso !' });
    },
    error =>{
      this.msgs.push({ severity: 'error', summary: 'Alteração com erro!' });
    })
  }

  getTurmas() {

    let valores = this.turmas;

    if ((
      this.nivelSelecionado != undefined
      && this.nivelSelecionado.id != undefined)) {
      valores = valores.filter((turma: ConsultaTurma) =>
        turma.idNivel === this.nivelSelecionado.id);
    }

    if ((
      this.modalidadeSelecionado != undefined
      && this.modalidadeSelecionado.id != undefined)) {
      valores = valores.filter((turma: ConsultaTurma) =>
        turma.idModalidade === this.modalidadeSelecionado.id);
    }

    return valores;
  }


excluir(){
  this.alunoService.delete(this.idAluno).subscribe(res =>{
      this.msgs.push({ severity: 'success', summary: 'Exclusão com Sucesso !' });
      this.roteador.navigate(['/consulta-alunos']);
  }, error => {
      this.msgs.push({ severity: 'error', summary: JSON.parse(error)["message"] });
      this.submit = false;
    });
}
}
