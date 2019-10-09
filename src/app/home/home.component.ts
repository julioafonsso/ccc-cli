import { AlunoService } from './../servicos/aluno.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private alunosService: AlunoService) { }
  private qtdAlunosAtivos: number;
  private qtdAlunosInativos: number;
  ngOnInit() {
    this.alunosService.getQtdAlunosAtivos().subscribe(res => this.qtdAlunosAtivos)
    this.alunosService.getQtdAlunosInativos().subscribe(res => this.qtdAlunosInativos)
  }

}
