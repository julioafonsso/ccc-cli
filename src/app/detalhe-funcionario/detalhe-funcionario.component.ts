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
  private botoes = new Array();
  private msgs: Message[];
  private submit: boolean;
  // private recebimentos: FluxoCaixa[];
  // private detalhes: any[];
  // private detalhe: Salario[];
  // private mostraDetalhe: boolean;
  // private idFluxoDetalhado: number;
  private mesReferenciaPagamento: string;
  private mesParaPagar: string
  

  constructor(private funcionarioService: FuncionarioService, private router: ActivatedRoute) {
    this.salario = new Salario();
    this.funcionario = new ConsultaFuncionario();
    this.salarios = [];
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

    data.setMonth(data.getMonth()-1)
    this.mesReferenciaPagamento = dp.transform(data.getTime(), "yyyy-MM");
    this.mesParaPagar = this.mesReferenciaPagamento;


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

      }
    );
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
    this.submit = true;
    this.mesParaPagar = this.mesReferenciaPagamento;
    this.funcionarioService.getSalario(this.idFuncionario, this.mesReferenciaPagamento).subscribe(res => {
      this.salarios = res;
      this.submit = false;
    })
  }

  setSalario(sal: Salario)
  {
    this.salario.id = sal.id;
  }

  pagar(pagamento: Salario)
  {
    this.funcionarioService.pagar(this.idFuncionario, pagamento).subscribe(res =>{
      this.msgs.push({ severity: 'success', summary: 'Pagamento Efetuado com Sucesso !' });
      this.loadPagamento();
      this.salario = new Salario();
    },
    error =>{
       this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
    })
  }

  fazerAdiantamento(){
    this.pagar(this.salario);
  }

  pagarMensalidade(salario: Salario){
    console.log(salario);
    this.pagar(salario);

  }

}
