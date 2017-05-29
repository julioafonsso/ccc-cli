import { ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';

import { Message } from 'primeng/primeng';
import { TipoDesconto } from './../models/tipo-desconto';
import { DescontoService } from './../servicos/desconto.service';

@Component({
  selector: 'app-cadastro-tipo-desconto',
  templateUrl: './cadastro-tipo-desconto.component.html',
  styleUrls: ['./cadastro-tipo-desconto.component.scss']
})
export class CadastroTipoDescontoComponent implements OnInit {

  private desconto: TipoDesconto;
  private msgs: Message[];
  private submit: boolean;

  constructor(private route: ActivatedRoute, private descontoService: DescontoService) {
    this.desconto = new TipoDesconto();
    this.msgs = [];
    this.submit = false;

  }

  ngOnInit() {
    this.loadTipoDesconto();
  }


  loadTipoDesconto() {
    this.route.params.subscribe(
      (params: any) => {
        if (params['id'] != undefined) {
          this.submit = true;
          this.descontoService.obterDesconto(params['id']).subscribe(res => {
            this.desconto = res;
            this.submit = false;
          })
        }
      })
  }


  cadastrar() {
    if (this.desconto.id != undefined)
      return this.descontoService.alterarTipoDesconto(this.desconto)
    return this.descontoService.cadastrarTipoDesconto(this.desconto)
  }

  onSubmit() {
    this.submit = true;
    this.cadastrar()
    
     .subscribe(response => {
                this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
                 this.desconto = new TipoDesconto();
                 this.submit = false;
            },
            error => {
                this.submit = false;
                this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
            })
    }
}
