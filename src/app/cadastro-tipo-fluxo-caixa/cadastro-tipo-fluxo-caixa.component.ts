import { TipoFluxoCaixaService } from './../servicos/tipo-fluxo-caixa.service';
import { Component, OnInit } from '@angular/core';

import { TipoFluxo } from './../models/tipo-fluxo';

@Component({
  selector: 'app-cadastro-tipo-fluxo-caixa',
  templateUrl: './cadastro-tipo-fluxo-caixa.component.html',
  styleUrls: ['./cadastro-tipo-fluxo-caixa.component.scss']
})
export class CadastroTipoFluxoCaixaComponent implements OnInit {

  private tipo = new TipoFluxo();
  constructor(private tipoFluxoService: TipoFluxoCaixaService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.tipoFluxoService.cadastrar(this.tipo)
    .subscribe((res: any) => {
      console.log(res);
    });
  }
}
