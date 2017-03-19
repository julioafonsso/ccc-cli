import { Component, OnInit } from '@angular/core';

import { TipoFluxo } from './../models/tipo-fluxo';
import { TipoFluxoCaixaService } from './../servicos/tipo-fluxo-caixa.service';

@Component({
  selector: 'app-consulta-tipo-fluxo',
  templateUrl: './consulta-tipo-fluxo.component.html',
  styleUrls: ['./consulta-tipo-fluxo.component.css']
})
export class ConsultaTipoFluxoComponent implements OnInit {

  private tipoFluxo: TipoFluxo[];

  constructor(private tipoService: TipoFluxoCaixaService) { }

  ngOnInit() {
    this.tipoService.getTipoFluxos().subscribe(res =>{
      this.tipoFluxo = res;
    })

  }

  getTiposFluxo(){
    return this.tipoFluxo;
  }

}
