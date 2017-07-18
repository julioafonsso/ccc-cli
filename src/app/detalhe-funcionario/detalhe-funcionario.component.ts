import { Salario } from './../models/salario';
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
  private salarios: Salario[];
  private salario: Salario;
  private valeTransporte: Salario;
  private botoes = new Array();
  private msgs: Message[];
  private submit: boolean;
  private pagamentos: any[];
  private mesReferenciaPagamento: string;
  private mesParaPagar: string
  private dataInicio: string;
  private dataFim: string;

  constructor(private funcionarioService: FuncionarioService, private router: ActivatedRoute) {
    this.salario = new Salario();
    this.funcionario = new ConsultaFuncionario();
    this.salarios = [];
    this.msgs = [];
    this.valeTransporte = new Salario();
    this.pagamentos = [];
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

    data.setMonth(data.getMonth() - 1)
    this.mesReferenciaPagamento = dp.transform(data.getTime(), "yyyy-MM");
    this.mesParaPagar = this.mesReferenciaPagamento;

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

  getValorTotal() {
    let total = 0;
    for (let i = 0; i < this.salarios.length; i++) {
      total += this.salarios[i].valor;
    }
    return total;
  }

  ngOnInit() {
    this.botoes[0] = true;
    this.inscricao = this.router.params.subscribe(
      (params: any) => {
        this.idFuncionario = params['id'];
        this.loadFuncionario();
        this.loadPagamento();
        this.loadValeTrans();
        this.loadHist();
      }
    );
  }

  loadHist() {
    this.funcionarioService.getRecebimentos(this.idFuncionario, this.dataInicio, this.dataFim).subscribe(res => {
      this.pagamentos = res;;
    })
  }


  loadFuncionario() {
    this.funcionarioService.getFuncionario(this.idFuncionario).subscribe(res => {
      this.funcionario = res;;
    })
  }

  getTabAtiva(x: number) {
    let retorno: boolean;
    retorno = this.botoes[x];
    return retorno;
  }

  tab(index: number) {
    this.botoes = new Array();
    this.botoes[index] = true;
  }




  loadPagamento() {
    this.submit = true;
    this.mesParaPagar = this.mesReferenciaPagamento;
    this.funcionarioService.getSalario(this.idFuncionario, this.mesReferenciaPagamento).subscribe(res => {
      this.salarios = res;
      this.submit = false;
    })
  }

  loadValeTrans() {
    this.submit = true;
    this.mesParaPagar = this.mesReferenciaPagamento;
    this.funcionarioService.getValeTrans(this.idFuncionario, this.mesReferenciaPagamento).subscribe(res => {
      this.valeTransporte = res;
      this.submit = false;
    })
  }

  setSalario(sal: Salario) {
    this.salario.id = sal.id;
  }

  pagar(pagamento: Salario) {
    this.funcionarioService.pagar(this.idFuncionario, pagamento).subscribe(res => {
      this.msgs.push({ severity: 'success', summary: 'Pagamento Efetuado com Sucesso !' });
      this.loadPagamento();
      this.loadHist();
      this.salario = new Salario();
    },
      error => {
        this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
      })
  }

  fazerAdiantamento() {
    this.pagar(this.salario);
  }

  pagarMensalidade(salario: Salario) {
    this.pagar(salario);

  }

  pagarVale(vale: Salario) {
    this.funcionarioService.pagarVale(this.idFuncionario, vale).subscribe(res => {
      this.msgs.push({ severity: 'success', summary: 'Pagamento Efetuado com Sucesso !' });
      this.loadValeTrans();
      this.salario = new Salario();
    },
      error => {
        this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
      })
  }

}
