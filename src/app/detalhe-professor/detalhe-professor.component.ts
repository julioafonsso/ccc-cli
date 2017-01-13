import { ProfessorService } from './../servicos/professor.service';
import { Professor } from './../models/professor';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhe-professor',
  templateUrl: './detalhe-professor.component.html',
  styleUrls: ['./detalhe-professor.component.scss']
})
export class DetalheProfessorComponent implements OnInit {
  private inscricao: Subscription;
  private idProfessor: number;
  private professor = new Professor();
  private botoes = new Array();

  constructor(private professorService: ProfessorService, private router: ActivatedRoute) { }

ngOnInit() {
    this.botoes[0] = true;
    this.inscricao = this.router.params.subscribe(
      (params: any) => {
        this.idProfessor = params['id'];
        this.loadProfessor();
        //this.loadTurmas();
      }
    );
  }
  loadProfessor(){
    this.professorService.getProfessor(this.idProfessor).subscribe(res =>{
      this.professor = res;
    })
  }

   getTabAtiva(x: number) {
    let retorno: boolean;
    retorno = this.botoes[x];
    return retorno;
  }

  tabBios() {
    this.botoes = new Array();
    this.botoes[0] = true;
  }

  tabTurmas() {
    this.botoes = new Array();
    this.botoes[1] = true;
  }

  tabPagamentos() {
    this.botoes = new Array();
    this.botoes[2] = true;
  }

}
