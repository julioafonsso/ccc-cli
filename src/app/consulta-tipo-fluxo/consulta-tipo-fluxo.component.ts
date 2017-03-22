import { Message } from 'primeng/primeng';
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
  private msgs: Message[];
  private submit: boolean;

  constructor(private tipoService: TipoFluxoCaixaService) {
    this.msgs = [];
  }

  reset() {
    this.tipoService.getTipoFluxos().subscribe(res => {
      this.tipoFluxo = res;
    })
    this.submit = false;
  }

  ngOnInit() {
    this.reset();

  }

  deletar(tipo: TipoFluxo) {
    this.submit =true;
    this.tipoService.deletar(tipo).subscribe(res => {
      this.reset();
      this.msgs.push({ severity: 'success', summary: 'Tipo Fluxo Apagado !' });
    },
      error => {
        console.log(error)
        this.msgs.push({ severity: 'error', summary: '', detail: JSON.parse(error._body)["message"] });
        this.submit = false;
      }
    )
  }


  getTiposFluxo() {
    return this.tipoFluxo;
  }

}
