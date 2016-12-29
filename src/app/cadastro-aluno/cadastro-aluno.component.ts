import { Component, OnInit } from '@angular/core';

import { AlunoService } from './../servicos/aluno.service';
import { Sexo } from './../models/sexo';
import { ConheceEscola } from './../models/conhece-escola';
import { Aluno } from './../models/aluno';


@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.scss']
})
export class CadastroAlunoComponent implements OnInit {

  private listaComoConheceu: ConheceEscola[];
  private Sexos: Sexo[];
  private aluno = new Aluno();

  constructor(private alunoService: AlunoService) { }

  ngOnInit() {
  
    this.alunoService.getListaComoConheceu().subscribe(res => {
      this.listaComoConheceu = res;
    })

    this.alunoService.getSexo().subscribe(res => {
      this.Sexos = res;
    })

  }

  onSubmit() {
    console.log(this.aluno)
    console.log(this.aluno.conheceEscola)
  }

}
