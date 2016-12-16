import { CadastroTurmaService } from './cadastro-turma.service';
import { Component, OnInit } from '@angular/core';

import { DiasAulas } from './../modulos/turma.module';

@Component({
  selector: 'app-cadastro-turma',
  templateUrl: './cadastro-turma.component.html',
  styleUrls: ['./cadastro-turma.component.scss']
})
export class CadastroTurmaComponent implements OnInit {
  dias: DiasAulas[];

  constructor(private cadasstroTurmaService: CadastroTurmaService) { }

  ngOnInit() {
    this.cadasstroTurmaService.getDiasAulas().subscribe(res => {
      console.log(res);
      this.dias = res});
  }

}
