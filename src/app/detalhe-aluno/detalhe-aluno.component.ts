import { AlunoService } from './../servicos/aluno.service';
import { Aluno } from './../models/aluno';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhe-aluno',
  templateUrl: './detalhe-aluno.component.html',
  styleUrls: ['./detalhe-aluno.component.scss']
})
export class DetalheAlunoComponent implements OnInit {

  private inscricao: Subscription;
  private idAluno: number;
  private aluno = new Aluno();

  constructor(private alunoService: AlunoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
     this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.idAluno = params['id'];
        this.loadAluno()
      }
    );
  }

  loadAluno(){
    this.alunoService.getAluno(this.idAluno).subscribe(res =>{
      this.aluno = res;
    })
  }

}
