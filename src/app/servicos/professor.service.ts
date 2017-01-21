import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Professor } from './../models/professor';
import { environment } from './../../environments/environment';
import { TurmaProfessor } from './../models/turma-professor';



@Injectable()
export class ProfessorService {

  constructor(private http: Http) { }


  cadstrarProfessor(professor: Professor) {
    return this.http.post(environment.url + "/professores", professor);
  }

   getProfessores() {
    if (environment.mock) {
      return this.http.get(environment.url + "professores.json")
        .map((response: Response) => <Professor[]>response.json())

    }
    else {
      return this.http.get(environment.url + "professores")
        .map((response: Response) => <Professor[]>response.json())
    }
   }


  /*getProfessor(idProfessor: number){
    return this.http.get(environment.url + "/professores/" + idProfessor ).map((response: Response) => <Professor> response.json());
  }*/

  getNomeProfessor(professores: TurmaProfessor[], index: number) {
    if (index > professores.length - 1) {
      return 'Sem Professor';
    }
    return professores[index].professor.nome;

  }

  getTurmaProfessor(idProfessor: number){
    if (environment.mock) {
      return this.http.get(environment.url + "turmas-professor.json").map((response: Response) => <TurmaProfessor[]>response.json());
    }
    else {
      return this.http.get(environment.url + "professores/" + idProfessor + "/turmas").map((response: Response) => <TurmaProfessor[]>response.json());
    }
  }

  getProfessor(idProfessor: number) {
    if (environment.mock) {
      return this.http.get(environment.url + "professor.json").map((response: Response) => <Professor>response.json());
    }
    else {
      return this.http.get(environment.url + "professores/" + idProfessor).map((response: Response) => <Professor>response.json());
    }
  }


}
