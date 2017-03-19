import { Turma } from './../models/turma';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Salario } from './../models/salario';
import { Professor } from './../models/professor';
import { environment } from './../../environments/environment';
import { HttpCustormerService } from './http-custormer.service';



@Injectable()
export class ProfessorService {

  constructor(private http: HttpCustormerService) { }

  atualizarProfessor(professor: Professor) {
    return this.http.put(environment.url + "/professores", professor);
  }

  cadastrarProfessor(professor: Professor) {
    return this.http.post(environment.url + "/professores", professor);
  }

  getMensalidadesParaReceber(idProfessor: number) {
    return this.http.get(environment.url + "/professores/" + idProfessor + "/salario-pendente")
      .map((res: Response) => <Salario[]>res.json());
  }

  getProfessores() {
      return this.http.get(environment.url + "professores")
        .map((response: Response) => <Professor[]>response.json())
  }

  getProfessor(idProfessor: number) {
      return this.http.get(environment.url + "/professores/" + idProfessor).map((response: Response) => <Professor>response.json());
  }

  getTurmaProfessor(idProfessor: number) {
      return this.http.get(environment.url + "professores/" + idProfessor + "/turmas").map((response: Response) => <Turma[]>response.json());
  }

  cadastrarRecebimento(idProfessor: number) {
    return this.http.post(environment.url + "professores/" + idProfessor + "/salario", null);

  }

}
