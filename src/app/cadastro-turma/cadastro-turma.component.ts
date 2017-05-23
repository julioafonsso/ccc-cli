import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TurmaService } from './../servicos/turma.service';
import { ProfessorService } from './../servicos/professor.service';
import { Message } from 'primeng/primeng';
import { Salas } from './../models/salas';
import { ModalidadeTurma } from './../models/modalidade-turma';
import { NivelTurma } from './../models/nivel-turma';
import { CadastroTurma } from './../models/cadastro-turma';
import { ConsultaProfessor } from './../models/consulta-professor';

@Component({
  selector: 'app-cadastro-turma',
  templateUrl: './cadastro-turma.component.html',
  styleUrls: ['./cadastro-turma.component.scss']
})



export class CadastroTurmaComponent implements OnInit {
  private professores: ConsultaProfessor[];
  private professoras: ConsultaProfessor[];
  private salas: Salas[];
  private nives: NivelTurma[];
  private modalidades: ModalidadeTurma[];
  private msgs: Message[];
  private turma: CadastroTurma;
  private submit: boolean;
  private load: any;

  constructor(private route: ActivatedRoute, private turmaService: TurmaService,
    private professorService: ProfessorService) {
    this.msgs = [];
    this.modalidades = [];
    this.professoras = [];
    this.professores = [];
    this.salas = [];
    this.nives = [];
    this.turma = new CadastroTurma()
    this.submit = false;
  }

  ngOnInit() {
    this.loadCamposBasicos();
    this.loadTurma();
  }

  loadTurma() {
    if (
      this.modalidades.length == 0 ||
      this.professoras.length == 0 ||
      this.professores.length == 0 ||
      this.salas.length == 0 ||
      this.nives.length == 0
    ) {
      this.load = setInterval(() => { this.loadTurma() }, 500);
    }
    else {
      clearInterval(this.load);
      this.route.params.subscribe(
        (params: any) => {
          if (params['id'] != undefined) {
            this.submit = true;
            // this.turmaService.getTurma(params['id']).subscribe(res => {
            //   this.turma = res;
            //   this.setCamposCombo();
            //   this.submit = false;
            // })
          }
        }
      );
    }


  }

  setCamposCombo() {
    // this.modalidades.forEach(v => {
    //   if (this.turma.modalidade.id == v.id)
    //     this.turma.modalidade = v;
    // })
    // this.nives.forEach(v => {
    //   if (this.turma.nivel.id == v.id)
    //     this.turma.nivel = v;
    // })
    // this.salas.forEach(v => {
    //   if (this.turma.sala.id == v.id)
    //     this.turma.sala = v;
    // })

    // this.professores.forEach(v => {
    //   if (this.turma.professor1.id == v.id)
    //     this.turma.professor1 = v;
    // })
    // this.professoras.forEach(v => {
    //   if (this.turma.professor2.id == v.id)
    //     this.turma.professor2 = v;
    // })
  }

  loadCamposBasicos() {

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

  reset() {
    this.turma = new CadastroTurma();
    this.loadCamposBasicos();
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
    this.cadastrar().subscribe((res: Response) => {
      this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
      this.reset()
    },
      error => {
        this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
        this.submit = false;
      })

  }

}
