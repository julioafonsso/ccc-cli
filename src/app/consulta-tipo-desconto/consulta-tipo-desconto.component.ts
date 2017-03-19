import { Component, OnInit } from '@angular/core';

import { DescontoService } from './../servicos/desconto.service';
import { TipoDesconto } from './../models/tipo-desconto';

@Component({
  selector: 'app-consulta-tipo-desconto',
  templateUrl: './consulta-tipo-desconto.component.html',
  styleUrls: ['./consulta-tipo-desconto.component.css']
})
export class ConsultaTipoDescontoComponent implements OnInit {
  private descontos: TipoDesconto[] ;

  constructor(private descontoService: DescontoService) { }
  
  ngOnInit() {
    this.descontoService.obterDescontos().subscribe(res =>{
      this.descontos = res;
    })
  }

  getDescontos(){
    return this.descontos;
  }
}
