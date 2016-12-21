import { Component, OnInit } from '@angular/core';

import { AlunoService, ComoConheceu } from './../servicos/aluno.service';

@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.scss']
})
export class CadastroAlunoComponent implements OnInit {

  private listaComoConheceu : ComoConheceu[];
  constructor(private alunoService : AlunoService) { }

  ngOnInit() {
    this.alunoService.getListaComoConheceu().subscribe(res => {
      this.listaComoConheceu = res;
    })
  }

}
