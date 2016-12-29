import { ModalidadeTurma } from './../models/modalidade-turma';
import { NivelTurma } from './../models/nivel-turma';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';


import { DiasSemana } from './../models/dias-semana';
import { Salas } from './../models/salas';

@Injectable()
export class TurmaService {

  constructor(private http: Http) { }

  getDiasAulas() {

    return this.http.get('json/dias.json')
      .map((response: Response) => <DiasSemana[]>response.json());
  }

  getSalas() {
    return this.http.get('json/salas.json')
      .map((response: Response) => <Salas[]>response.json());
  }

  getNiveis() {
    return this.http.get('json/niveis-turma.json')
      .map((response: Response) => <NivelTurma[]>response.json());
  }

  getModalidades() {
    return this.http.get('json/modalidade-turma.json')
      .map((response: Response) => <ModalidadeTurma[]>response.json());
  }

  cadastrarModalidade(modalidade: ModalidadeTurma) {
    console.log(modalidade)
    this.http.post('http://localhost:8080/turma/modalidade', modalidade)
      .subscribe((err: any) =>{
        console.log("ENTROU");
        console.log(err); 
      } )
    console.log("AKI")
    //  .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

  }
}
