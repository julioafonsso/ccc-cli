import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Rx';
import { ConsultaFuncionario } from './../models/consulta-funcionario';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/primeng';
import { FuncionarioService } from './../servicos/funcionario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhe-funcionario',
  templateUrl: './detalhe-funcionario.component.html',
  styleUrls: ['./detalhe-funcionario.component.scss']
})
export class DetalheFuncionarioComponent implements OnInit {
  private inscricao: Subscription;
  private idFuncionario: number;
  private funcionario: ConsultaFuncionario;
  // private salarios: Salario[];
  private botoes = new Array();
  private msgs: Message[];
  private submit: boolean;
  // private recebimentos: FluxoCaixa[];
  // private detalhes: any[];
  // private detalhe: Salario[];
  // private mostraDetalhe: boolean;
  // private idFluxoDetalhado: number;
  private dataInicioHistPagamento: string;
  private dataFimHistPagamento: string;
  private mesReferenciaPagamento: string;
  private mesParaPagar: string
  

  constructor(private funcionarioService: FuncionarioService, private router: ActivatedRoute) {
    this.funcionario = new ConsultaFuncionario();
    // this.salarios = [];
    this.msgs = [];
    // this.recebimentos = [];
    this.submit = false;
    // this.detalhes = [];
    // this.detalhe = [];
    // this.mostraDetalhe = false;
    // this.idFluxoDetalhado = -1;
    this.initDatas();

  }

  initDatas() {
    let dp = new DatePipe("yyyy-MM");
    let data = new Date(Date.now());
    this.dataFimHistPagamento = dp.transform(Date.now(), "yyyy-MM");

    data.setMonth(data.getMonth()-1)
    this.mesReferenciaPagamento = dp.transform(data.getTime(), "yyyy-MM");
    this.mesParaPagar = this.mesReferenciaPagamento;

    data.setMonth(data.getMonth()-5)
    this.dataInicioHistPagamento = dp.transform(data.getTime(), "yyyy-MM");

  }

  // getValorTotal() {
  //   let total = 0;
  //   for (let i = 0; i < this.salarios.length; i++) {
  //     total += this.salarios[i].valor;
  //   }
  //   return total;
  // }

  ngOnInit() {
    this.botoes[0] = true;
    this.inscricao = this.router.params.subscribe(
      (params: any) => {
        this.idFuncionario = params['id'];
        this.loadFuncionario();
        this.loadPagamento();
        this.pesquisarPagamentoHistorico();

      }
    );
  }

  loadRecebimentos() {
    // this.funcionarioService.getRecebimentos(this.idFuncionario, this.dataInicioHistPagamento, this.dataFimHistPagamento).subscribe(res ConsultaFuncionario> {
    //   this.recebimentos = res;
    //   this.loadDetalheRecebimento();
    // })
  }

  // loadDetalheRecebimento() {
  //   this.recebimentos.forEach(v => {
  //     this.funcionarioService.getDetalheRecebimento(v.id).subscribe(res ConsultaFuncionario> {
  //       this.detalhes[v.id] = res;
  //     })
  //   })
  // }


  loadFuncionario() {
    this.funcionarioService.getFucionario(this.idFuncionario).subscribe(res => {
      this.funcionario = res;;
    })
  }

  getTabAtiva(x: number) {
    let retorno: boolean;
    retorno = this.botoes[x];
    return retorno;
  }

  tabBios() {
    this.botoes = new Array();
    this.botoes[0] = true;
  }


  tabPagamentos() {
    this.botoes = new Array();
    this.botoes[1] = true;
  }

  tabHistPagamentos() {
    this.botoes = new Array();
    this.botoes[2] = true;
  }
  
  loadPagamento() {
    // this.submit = true;
    // this.mesParaPagar = this.mesReferenciaPagamento;
    // this.funcionarioService.getMensalidadesParaReceber(this.idFuncionario, this.mesReferenciaPagamento).subscribe(res ConsultaFuncionario> {
    //   this.salarios = res;
    //   this.submit = false;
    // })
  }

  

  
  pesquisarPagamentoHistorico() {
    if (this.dataInicioHistPagamento == undefined || this.dataInicioHistPagamento.toString().length < 7) {
      this.msgs.push({ severity: 'error', summary: 'Pesquisa Com Erro !', detail: "Selecionar Data Inicio" });
    }
    else if (this.dataFimHistPagamento == undefined || this.dataFimHistPagamento.toString().length < 7) {
      this.msgs.push({ severity: 'error', summary: 'Pesquisa Com Erro !', detail: "Selecionar Data Fim" });
    }
    else {
      this.loadRecebimentos();
    }
  }

}
