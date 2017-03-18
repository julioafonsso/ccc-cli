import { ActivatedRoute } from '@angular/router';
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
  private submit: boolean;

  constructor(private route: ActivatedRoute, private turmaService: TurmaService,
    private professorService: ProfessorService) {
    this.msgs = [];
    this.turma = new Turma()
    this.submit = false;
  }

  ngOnInit() {
    this.turma.inicializarTurmaProfessor();
    this.loadCamposBasicos();
    this.loadTurma();
  }

  loadTurma() {
    this.route.params.subscribe(
      (params: any) => {
        if (params['id'] != undefined) {
          this.submit = true;
          this.turmaService.getTurma(params['id']).subscribe(res => {
            this.turma = res;
            this.setCamposCombo();
            this.submit = false;
          })
        }
      }
    );
  }

  setCamposCombo() {
    this.modalidades.forEach(v => {
      if (this.turma.modalidade.id == v.id)
        this.turma.modalidade = v;
    })

    this.nives.forEach(v => {
      if (this.turma.nivel.id == v.id)
        this.turma.nivel = v;
    })

    this.salas.forEach(v => {
      if (this.turma.sala.id == v.id)
        this.turma.sala = v;
    })


    this.professores.forEach(v => {
      if (this.turma.professores[0].professor.id == v.id)
        this.turma.professores[0].professor = v;
    })

    this.professoras.forEach(v => {
      if (this.turma.professores[1].professor.id == v.id)
        this.turma.professores[1].professor = v;
    })

    this.turma.diasSemana.forEach(v => {
      this.dias.forEach(x => {
        if (v.id == x.id)
          x.check = true;
      })
    })

  }

  loadCamposBasicos() {
    this.turmaService.getDiasAulas().subscribe(res => {
      this.dias = res
      this.dias.forEach(v => {
        v.check = false;
      })
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
    dia.check = event.target.checked 
  }

  tratarDias() {
    this.turma.diasSemana = [];
    console.log(this.turma.diasSemana)
    this.dias.forEach(v => {
      if (v.check)
        this.turma.diasSemana.push(v);
    })
    console.log(this.turma.diasSemana)
  }

  reset() {
    this.turma = new Turma();
    this.turma.inicializarTurmaProfessor();
    this.loadCamposBasicos();
    this.dataInicio = null;
    this.dataTermino = null;
    this.submit = false;
  }

  cadastrar() {
    if (this.turma.id == undefined)
      return this.turmaService.cadastrarTurma(this.turma);
    else
      return this.turmaService.alterarTurma(this.turma);
  }

  onSubmit() {
    this.submit = true;
    let valorInicial = this.turma.mensalidade;
    let valor = this.turma.mensalidade.toString().replace(/[^0-9]/gi, '');
    // this.turma.mensalidade = Number(valor.substr(0, valor.length - 2) + "." + valor.substring(valor.length - 2))
    this.tratarDias();
      this.cadastrar().subscribe((res: Response) => {
        this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
        this.reset()
      },
        error => {
          this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
          // this.turma.mensalidade = valorInicial;
          this.submit = true;
        })

  }

}
