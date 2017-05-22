import { Component, OnInit } from '@angular/core';

import { DescontoService } from './../servicos/desconto.service';
import { TipoDesconto } from './../models/tipo-desconto';

import { Message } from 'primeng/primeng';


@Component({
  selector: 'app-consulta-tipo-desconto',
  templateUrl: './consulta-tipo-desconto.component.html',
  styleUrls: ['./consulta-tipo-desconto.component.css']
})
export class ConsultaTipoDescontoComponent implements OnInit {
  private descontos: TipoDesconto[] ;
  private msgs: Message[];
  private submit: boolean;
  constructor(private descontoService: DescontoService) { 
    this.msgs = []
  }
  
  reset(){
    this.submit = false;
    this.descontoService.obterDescontos().subscribe(res =>{
      console.log(res)
      this.descontos = res;
    })
  }

  deletar(desconto: TipoDesconto){
    this.submit = true;
    this.descontoService.deletar(desconto).subscribe(res => {
      this.reset();
      this.msgs.push({ severity: 'success', summary: 'Tipo Desconto Apagado !' });
    },
      error => {
        console.log(error)
        this.msgs.push({ severity: 'error', summary: '', detail: JSON.parse(error._body)["message"] });
        this.submit = false;
      }
    )
  }

  ngOnInit() {
    this.reset()
  }

  getDescontos(){
    return this.descontos;
  }
}
