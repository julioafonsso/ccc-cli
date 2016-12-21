import { Component, OnInit } from '@angular/core';

import { TipoTurmaService, NivelTurma } from './../servicos/tipo-turma.service';

@Component({
  selector: 'app-cadastro-tipo-turma',
  templateUrl: './cadastro-tipo-turma.component.html',
  styleUrls: ['./cadastro-tipo-turma.component.scss']
})
export class CadastroTipoTurmaComponent implements OnInit {

  private niveis :NivelTurma[];
  constructor(private tipoTurmaService: TipoTurmaService) { }

  ngOnInit() {
    this.tipoTurmaService.getNiveis().subscribe(res => {
      this.niveis = res;
    })
  }

}
