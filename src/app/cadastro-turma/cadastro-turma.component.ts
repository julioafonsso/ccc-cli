import { DatePipe } from '@angular/common';
import { Response } from '@angular/http';
import { TurmaProfessor } from './../models/turma-professor';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TurmaService } from './../servicos/turma.service';
import { ProfessorService } from './../servicos/professor.service';
import { Message } from 'primeng/primeng';
import { Salas } from './../models/salas';
import { Professor } from './../models/professor';
import { DiasSemana } from './../models/dias-semana';
import { ModalidadeTurma } from './../models/modalidade-turma';
import { NivelTurma } from './../models/nivel-turma';
import { Turma } from './../models/turma';


@Component({
  selector: 'app-cadastro-turma',
  templateUrl: './cadastro-turma.component.html',
  styleUrls: ['./cadastro-turma.component.scss']
})



export class CadastroTurmaComponent implements OnInit {
  private dias: DiasSemana[];
  private professores: Professor[];
  private professoras: Professor[];
  private salas: Salas[];
  private nives: NivelTurma[];
  private modalidades: ModalidadeTurma[];
  private msgs: Message[];
  private selecionado: string = "tete";
  private turma: Turma;
  private dataInicio: Date;
  private dataTermino: Date
  private submit:boolean;

  constructor(private turmaService: TurmaService,
    private professorService: ProfessorService) {
    this.msgs = [];
    this.turma = new Turma()
    this.submit = false;
  }

  ngOnInit() {
    this.turma.inicializarTurmaProfessor();
    this.loadCamposBasicos();
  }

  loadCamposBasicos() {
    this.turmaService.getDiasAulas().subscribe(res => {
      this.dias = res
    });

    this.professorService.getProfessores().subscribe(res => {
      this.professores = res;
      this.professoras = res;
    })

    this.turmaService.getSalas().subscribe(res => {
      this.salas = res;
    })

    this.turmaService.getModalidades().subscribe(res => {
      this.modalidades = res;
    })

    this.turmaService.getNiveis().subscribe(res => {
      this.nives = res;
    })
  }

  checkDias(dia: DiasSemana, event) {
    if (event.target.checked) {
      this.turma.addDia(dia)
    }
    else {
      this.turma.removeDia(dia)
    }
  }

  reset() {
    this.turma = new Turma();
    this.turma.inicializarTurmaProfessor();
    this.loadCamposBasicos();
    this.dataInicio = null;
    this.dataTermino = null;
    this.submit =false;
  }

  onSubmit() {
    this.submit =true;
    let d = new DatePipe("pt");
    this.turma.dataInicio = d.transform(this.dataInicio, 'yyyyMMdd');
    this.turma.dataTermino = d.transform(this.dataTermino, 'yyyyMMdd');
    let valorInicial = this.turma.mensalidade;
    let valor = this.turma.mensalidade.toString().replace(/[^0-9]/gi, '');
    this.turma.mensalidade =  Number(valor.substr(0, valor.length - 2) + "." + valor.substring(valor.length - 2))
    console.log(this.turma)
    this.turmaService.cadastrarTurma(this.turma).subscribe((res: Response) => {
      this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
      this.reset()
    },
      error => {
        this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
        this.turma.mensalidade = valorInicial;
        this.submit = true;
      })

  }

}
