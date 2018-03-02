import { ActivatedRoute } from '@angular/router';
import { CadastroFluxoCaixa } from './../models/cadastro-fluxo-caixa';
import { DatePipe } from '@angular/common';
import { Response } from '@angular/http';
import { Message } from 'primeng/primeng';
import { FluxoCaixaService } from './../servicos/fluxo-caixa.service';
import { Component, OnInit } from '@angular/core';

import { TipoFluxoCaixaService } from './../servicos/tipo-fluxo-caixa.service';
import { TipoFluxo } from './../models/tipo-fluxo';


@Component({
  selector: 'app-lancamento-movimentacao-caixa',
  templateUrl: './lancamento-movimentacao-caixa.component.html',
  styleUrls: ['./lancamento-movimentacao-caixa.component.scss']
})
export class LancamentoMovimentacaoCaixaComponent implements OnInit {

  private fluxos: TipoFluxo[];
  private fluxosEntrada: TipoFluxo[];
  private fluxosSaida: TipoFluxo[];
  private fluxoCaixa : CadastroFluxoCaixa;
  private msgs: Message[];
  private data: Date;
  private submit:boolean;
  private dp = new DatePipe("yyyyMMdd");
  constructor(private tipoFluxoService: TipoFluxoCaixaService, private fluxoCaixaService: FluxoCaixaService,private route: ActivatedRoute ) {
    this.fluxosEntrada = [];
    this.fluxosSaida = [];
    this.submit =false; 
    this.fluxoCaixa = new CadastroFluxoCaixa();
    this.fluxoCaixa.data = this.dp.transform(new Date(), 'yyyy-MM-dd');
    this.msgs = [];
  }

  ngOnInit() {
    this.tipoFluxoService.getTipoFluxoEntrada().subscribe(res => {
      this.fluxosEntrada = res;
    });

    this.tipoFluxoService.getTipoFluxoSaida().subscribe(res => { this.fluxosSaida = res })
    this.loadLancamento();
  }

  atualizarTipoFluxo(indEntrada) {
    if(indEntrada == 'E'){
      this.fluxos = this.fluxosEntrada;
    }
    else{
      this.fluxos = this.fluxosSaida;
    }

    this.fluxoCaixa.idTipo = undefined;
    
  }

  getFluxos(){
    return this.fluxos.sort((a:TipoFluxo ,b: TipoFluxo) =>{
      if(a.nome < b.nome )
        return -1
      if(a.nome > b.nome )
        return 1
      return 0;
    })
  }

  onSubmit(){
    this.fluxoCaixaService.cadastrar(this.fluxoCaixa)
    .subscribe((res: Response) =>{
      this.submit = false
      this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
      this.fluxoCaixa = new CadastroFluxoCaixa();
      this.fluxoCaixa.data = this.dp.transform(new Date(), 'yyyy-MM-dd');
    },
      error => {
        this.submit =false;
        this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
      });
  }

  private load: any;
  loadLancamento() {
    if (this.fluxosEntrada.length == 0 || this.fluxosSaida.length == 0 ) {
      this.load = setInterval(() => { this.loadLancamento() }, 500);
  }
  else{
    clearInterval(this.load)
    this.route.params.subscribe(
      (params: any) => {
          if (params['id'] != undefined) {
              this.submit = true;
              
              this.fluxoCaixaService.getFluxo(params['id']).subscribe(res => {
                  this.atualizarTipoFluxo(res.tipo);
                  this.fluxoCaixa = res;
                  this.submit = false;

              })
          }
      }
  );
  }
        
}
}
