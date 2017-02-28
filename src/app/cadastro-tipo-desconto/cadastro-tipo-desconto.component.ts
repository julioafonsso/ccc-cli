
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

  constructor(private descontoService: DescontoService) {
    this.desconto = new TipoDesconto();
    this.msgs = [];
    this.submit =false;
    
  }

  ngOnInit() {
      
  }

  onSubmit() {
    this.submit =true;
    this.descontoService.cadastrarTipoDesconto(this.desconto).subscribe(response => {
      this.desconto = new TipoDesconto();
      this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
      this.submit =false;
    }, erro => {
      this.submit =false;
      this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !' });
    })
  }

}
