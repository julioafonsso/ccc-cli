import { Message } from 'primeng/primeng';
import { DatePipe } from '@angular/common';
import { ConsultaAlunosMatriculados } from './../models/consulta-alunos-matriculados';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';


import { ModalidadeTurma } from './../models/modalidade-turma';
import { NivelTurma } from './../models/nivel-turma';
import { TurmaService } from './../servicos/turma.service';
import { ConsultaTurma } from './../models/consulta-turmas';
import { ProfessorService } from './../servicos/professor.service';

@Component({
  selector: 'app-consulta-turmas',
  templateUrl: './consulta-turmas.component.html',
  styleUrls: ['./consulta-turmas.component.scss']
})
export class ConsultaTurmasComponent implements OnInit {

  constructor(private turmaService: TurmaService) {
    this.alunos = [];
    this.msgs = [];
  }

  private msgs: Message[];
  private niveis = new Array<NivelTurma>();
  private modalidades = new Array<ModalidadeTurma>()
  private turmas: ConsultaTurma[];

  private nivelSelecionado: NivelTurma;
  private modalidadeSelecionado: ModalidadeTurma;

  private alunos: ConsultaAlunosMatriculados[];
  private diasAulas: Date[];
  private url: any;
  private idTurmaExcluir:Number;

  ngOnInit() {
    this.turmaService.getTurmas().subscribe(res => {
      this.turmas = res;
    })

    this.turmaService.getNiveis().subscribe(res => {
      this.niveis.push(new NivelTurma());
      res.forEach(element => {
        this.niveis.push(element);
      });

    })

    this.turmaService.getModalidades().subscribe(res => {
      this.modalidades.push(new ModalidadeTurma());
      res.forEach(element => {
        this.modalidades.push(element);
      });
    })
  }

  
  getTurmas() {

    let valores = this.turmas;

    if ((
      this.nivelSelecionado != undefined
      && this.nivelSelecionado.id != undefined)) {
      valores = valores.filter((turma: ConsultaTurma) =>
        turma.idNivel === this.nivelSelecionado.id);
    }

    if ((
      this.modalidadeSelecionado != undefined
      && this.modalidadeSelecionado.id != undefined)) {
      valores = valores.filter((turma: ConsultaTurma) =>
        turma.idModalidade === this.modalidadeSelecionado.id);
    }

    return valores;
  }

  getAlunos(id: number) {
    this.turmaService.getAlunos(id).subscribe(res => {
      this.alunos = res;
    })
    this.turmaService.getListaPresenca(id).subscribe(res => {
      this.downloadFile(res._body);
    })

  }

  downloadFile(data: any) {


    var blob = new Blob([data], { type: 'application/vnd.ms-excel' });

    this.url= window.URL.createObjectURL(this.b64ToBlob(data));

  }

private b64ToBlob(valor:string){
  let size = 512;
  let byteChar = atob(valor);
  var byteArrays = [];
  for(var offset = 0; offset < byteChar.length; offset += size)
  {
    var slice = byteChar.slice(offset, offset + size);
    var byteNumber = new Array(slice.length);
    for(var i = 0; i< slice.length; i++)
    {
      byteNumber[i]=slice.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumber);
    byteArrays.push(byteArray); 
  
  }
    return  new Blob(byteArrays, {type : 'data:application/vnd.ms-excel'})
}

  export() {


    var link = document.createElement("a");
    link.setAttribute("href", this.url);
    link.setAttribute("download", "lista presen&#231;a.xls");
    document.body.appendChild(link);
    link.click();


  }

  setTurmaExcluir(id){
    this.idTurmaExcluir = id;
  }

  excluirTurma(){
    this.turmaService.excluir(this.idTurmaExcluir).subscribe(res => {
      this.msgs.push({ severity: 'success', summary: 'Exclusão com Sucesso !' });
      this.turmaService.getTurmas().subscribe(res => {
        this.turmas = res;
      })
      
    }, error => {
      this.msgs.push({ severity: 'error', summary: JSON.parse(error)["message"] });
    });
  }
}
