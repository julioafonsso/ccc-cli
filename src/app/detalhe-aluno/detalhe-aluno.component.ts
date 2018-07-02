import { AulaAvulsa } from './../models/aula-avulsa';
import { Taxa } from './../models/taxa';
import { PagamentoMatricula } from './../models/pagamento-matricula';

import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Message, ConfirmationService } from 'primeng/primeng';

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
import { Pagamentos } from "app/models/pagamentos";

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
  private pagamentos: Pagamentos;
  private taxa: Taxa;
  private aulaAvulsa: AulaAvulsa;

  constructor(private alunoService: AlunoService, private turmaService: TurmaService,
    private professorService: ProfessorService, private descontoService: DescontoService, private route: ActivatedRoute,
    private workService: WorkshopService, private roteador: Router,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe) {
    this.msgs = [];
    this.aluno = new ConsultaAlunos();
    this.botoes = new Array();
    this.submit = false;
    this.initDatas();
    this.matricula = new CadastroMatricula();
    this.aula = new CadastroAulaParticular();
    this.niveis = new Array<NivelTurma>();
    this.modalidades = new Array<ModalidadeTurma>()
    this.pagamentos = new Pagamentos();
    this.taxa = new Taxa();
    this.taxa.dataPagamentoDate = new Date();
    this.aulaAvulsa = new AulaAvulsa();
    this.aulaAvulsa.dataPagamentoDate = new Date();
  }


  reset() {

    this.loadAluno();
    this.loadMatriculas();
    this.loadTurmasColetivas();
    this.loadDebitos();
    this.pesquisarHistPagamento();
    this.pesquisarAulasParticulares();
    this.pesquisarWorkShops();
    this.loadAulasParticulares();
    this.matricula = new CadastroMatricula();
    this.matricula.dataMatriculaDate = new Date();
    this.taxa = new Taxa();
    this.taxa.dataPagamentoDate = new Date();
    this.aulaAvulsa = new AulaAvulsa();
    this.aulaAvulsa.dataPagamentoDate = new Date();
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

  addTaxas() {
    this.taxa.valor = this.getValor(this.taxa.valor.toString())
    this.taxa.dataPagamento = this.datePipe.transform(this.taxa.dataPagamentoDate, 'yyyy-MM-dd')
    this.pagamentos.taxas.push(this.taxa);
    this.taxa = new Taxa();
    this.taxa.dataPagamentoDate = new Date();

  }

  addAulaAvulsa() {
    this.aulaAvulsa.valor = this.getValor(this.aulaAvulsa.valor.toString())
    this.aulaAvulsa.dataPagamento = this.datePipe.transform(this.aulaAvulsa.dataPagamentoDate, 'yyyy-MM-dd')
    this.pagamentos.aulasAvulsa.push(this.aulaAvulsa);
    this.aulaAvulsa = new AulaAvulsa();
    this.aulaAvulsa.dataPagamentoDate = new Date();
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

  matricular() {
    console.log(this.matricula)
    this.matricula.idAluno = this.idAluno;
    this.matricula.dataMatricula = this.datePipe.transform(this.matricula.dataMatriculaDate, 'yyyy-MM-dd')
    this.turmaService.matricularAluno(this.matricula)
      .subscribe(res => {
        this.msgs.push({ severity: 'success', summary: 'Matriculado com Sucesso !' });
        let mat = new PagamentoMatricula();
        mat.idMatricula = res.json();
        mat.idTurma = this.matricula.idTurma;
        
        if(this.matricula.valor == undefined)
          this.matricula.valor = "0,00"

        let valor = this.matricula.valor.replace(",", "")
        valor = valor.replace(".", "")
        let i = valor.length;
        valor = valor.substring(0, i - 2) + "." + valor.substring(i - 2)
        mat.valor = new Number(valor).valueOf();
        this.pagamentos.matriculas.push(mat)
        this.reset();
      }, error => {
        this.msgs.push({ severity: 'error', summary: JSON.parse(error._body)["message"] });
        this.submit = false;
      });
  }


  matricularWork(work: ConsultaWorkShop) {

    if (this.matriculasWorkShops.map(function (x) { return x.idTurma; }).indexOf(work.id) > -1) {
      this.msgs.push({ severity: 'error', summary: 'Aluno já cadastrado no workshop' });
    }
    else {

      let index = this.pagamentos.workShop.map(function (x) { return x.id; }).indexOf(work.id);
      if (index < 0)
        this.pagamentos.workShop.push(work);

    }
  }


  cadastrarAulaParticular() {
    this.pagamentos.aulasParticulares.push(this.aula);
    this.aula = new CadastroAulaParticular();
  }

  pagar() {
    console.log(this.pagamentos.taxas)
    this.submit = true;
    this.alunoService.efetuarPagamento(this.idAluno, this.pagamentos).subscribe(res => {
      this.msgs.push({ severity: 'success', summary: 'Pagamento Com Sucesso !' });
      this.reset();
      this.pagamentos = new Pagamentos();
    }, error => {
      this.submit = false;
      this.msgs.push({ severity: 'error', summary: JSON.parse(error._body)["message"] });
    });

  } 
  cancelarMensalidade(mensalidade: ConsultaMensalidades) {
    console.log("CAncelando")
    this.submit = true;
    this.turmaService.excluirMensalidade(mensalidade.id).subscribe(res => {
      this.msgs.push({ severity: 'success', summary: 'Mensalidade Apagada !' });
      this.reset();
    },
      error => {
        
        this.msgs.push({ severity: 'error', summary: JSON.parse(error._body )["message"] });
        this.submit = false;
      })
  }

  pagarMensalidade(mensalidade: ConsultaMensalidades) {
    let mensalidadeParaPagar: ConsultaMensalidades = Object.assign({}, mensalidade);;
    mensalidadeParaPagar.valorCalculado = mensalidade.valorMensalidade
    this.addMensalidadeParaPagar(mensalidadeParaPagar)
  }

  pagarMensalidadeCalculada(mensalidade: ConsultaMensalidades) {
    let mensalidadeParaPagar: ConsultaMensalidades = Object.assign({}, mensalidade);;
    this.addMensalidadeParaPagar(mensalidadeParaPagar)
  }


  alterarDesconto(matricula: ConsultaMatricula) {
    this.turmaService.alterarDesconto(matricula.id, matricula.idDesconto).subscribe(res => {
      this.msgs.push({ severity: 'success', summary: 'Desconto Alterado !' });
    },
      error => {
        this.msgs.push({ severity: 'error', summary: 'Erro no processo!' });
      })
  }

  getTurmas() {

    let valores = this.turmas;

    if ((
      this.nivelSelecionado != undefined
      && this.nivelSelecionado.id != undefined)) {
      valores = valores.filter((turma: ConsultaTurma) => {
        return turma.idNivel === this.nivelSelecionado.id
      });
    }

    if ((
      this.modalidadeSelecionado != undefined
      && this.modalidadeSelecionado.id != undefined)) {
      valores = valores.filter((turma: ConsultaTurma) =>
      { return turma.idModalidade === this.modalidadeSelecionado.id });
    }

    return valores;
  }


  excluir() {
    this.confirmationService.confirm({
      message: 'Deseja excluir o Aluno?',
      accept: () => {
        this.alunoService.delete(this.idAluno).subscribe(res => {
          this.msgs.push({ severity: 'success', summary: 'Exclusão com Sucesso !' });
          this.roteador.navigate(['/consulta-alunos']);
        }, error => {
          this.msgs.push({ severity: 'error', summary: JSON.parse(error._body)["message"] });
          this.submit = false;
        });
      }
    });


  }

  addMensalidadeParaPagar(mensalidade: ConsultaMensalidades) {

    let index = this.pagamentos.mensalidadesParaPagar.map(function (x) { return x.id; }).indexOf(mensalidade.id);
    if (index < 0)
      this.pagamentos.mensalidadesParaPagar.push(mensalidade)

  }

  cancelarPagamentoMensalidade(index: number) {
    this.pagamentos.mensalidadesParaPagar.splice(index, 1)
  }

  cancelarPagamentoAulaParticular(index: number) {
    this.pagamentos.aulasParticulares.splice(index, 1)
  }

  cancelarWorkShop(index: number) {
    this.pagamentos.workShop.splice(index, 1)
  }


  cancelarTaxa(index: number) {
    this.pagamentos.taxas.splice(index, 1)
  }

  getModalidade(id: number) {
    return this.modalidades.filter((modalidade) => {
      return modalidade.id === id;
    })[0].nome
  }

  getValor(str: string) {
    let valor = str.replace(/[^0-9]/gi, '');
    valor = valor.substr(0, valor.length - 2) + "." + valor.substr(valor.length - 2)
    return new Number(valor).valueOf();
  }

  getValorTotalParaPagar() {
    let valorTotal = 0;
    this.pagamentos.aulasParticulares.forEach(aula => {

      valorTotal = valorTotal + this.getValor(aula.valorPago.toString());
    })

    this.pagamentos.taxas.forEach(taxa => {
      valorTotal = valorTotal + taxa.valor;
    })


    this.pagamentos.mensalidadesParaPagar.forEach(mensalidade => {
      valorTotal = valorTotal + mensalidade.valorCalculado;
    })

    this.pagamentos.workShop.forEach(work => {
      valorTotal = valorTotal + work.valorMensalidade;
    })

    this.pagamentos.matriculas.forEach(mat => {
      valorTotal = valorTotal + mat.valor;
    })

    this.pagamentos.aulasAvulsa.forEach(aulas => {
      valorTotal = valorTotal + aulas.valor;
    })

    return valorTotal;
  }

  excluirMatricula(matricula: ConsultaMatricula) {
    this.turmaService.excluirMatricula(matricula.id).subscribe(res => {
      this.msgs.push({ severity: 'success', summary: 'Aluno foi excluido da turma !' });
      this.loadMatriculas();
      this.pagamentos.matriculas = this.pagamentos.matriculas.filter(m =>{
        return m.idMatricula != matricula.id;
      })
    }, error => {
      this.msgs.push({ severity: 'error', summary: JSON.parse(error._body)["message"] });
      this.submit = false;
    });
  }

  getModalidadeTurma(id: number) {
    return this.getModalidade(this.turmas.filter(turma => {
      return turma.id === id;
    })[0].idModalidade)
  }

  getNomeTaxa(id: number){
    if(id == 8)
      return 'ARM'
    if(id == 10)
      return 'TXF'
    return ''
  }

  getCodigoTurma(id: number){
    
    return this.turmas.filter(c => {return c.id === id})[0].codigo;
  }

  getNomeTurma(id: number){
    return this.turmas.filter(c => { return c.id === id})[0].nomeModalidade;
  }
}
