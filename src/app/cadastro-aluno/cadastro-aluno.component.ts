import { EstadoCivil } from './../models/estado-civil';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import { AlunoService } from './../servicos/aluno.service';
import { ConheceEscola } from './../models/conhece-escola';
import { Aluno } from './../models/aluno';


@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.scss']
})
export class CadastroAlunoComponent implements OnInit {

  private listaEstadoCivil: EstadoCivil[];
  // private aluno = new Aluno();

  private listaComoConheceu: ConheceEscola[];
  private aluno = new Aluno();

  constructor(private alunoService: AlunoService) { }

  ngOnInit() {
  
    this.alunoService.getListaEstadoCivil().subscribe(res => {
      this.listaEstadoCivil = res;
    })

    this.alunoService.getListaComoConheceu().subscribe(res => {
      this.listaComoConheceu = res;
    })

  }

  onSubmit() {
    this.alunoService.cadastrar(this.aluno)
    .subscribe((res: any) =>{
      console.log(res)
    })
  }

}
