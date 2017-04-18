import { DatePipe } from '@angular/common';
import { FluxoCaixa } from './../models/fluxo-caixa';
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

  getMensalidadesParaReceber(idProfessor: number, mesReferencia:string) {
    return this.http.get(environment.url + "/professores/" + idProfessor + "/salario-pendente/" + mesReferencia)
      .map((res: Response) => <Salario[]>res.json());
  }

  getProfessores() {
      return this.http.get(environment.url + "professores")
        .map((response: Response) => <Professor[]>response.json())
  }

  getProfessor(idProfessor: number) {
      return this.http.get(environment.url + "/professores/" + idProfessor).map((response: Response) => <Professor>response.json());
  }

  getRecebimentos(idProfessor: number, dataInicio: string, dataFim: string){
    return this.http.get(environment.url + "professores/" + idProfessor + "/recibos/"+ dataInicio + "/" +dataFim).map((response: Response) => <FluxoCaixa[]>response.json());
  }

  getTurmaProfessor(idProfessor: number) {
      return this.http.get(environment.url + "professores/" + idProfessor + "/turmas").map((response: Response) => <Turma[]>response.json());
  }

  getDetalheRecebimento(idFluxo: number){
    return this.http.get(environment.url + "professores/detalhe-pagamento/"+ idFluxo).map((response: Response) => <Salario[]>response.json());
  }
  cadastrarRecebimento(idProfessor: number,mes: string ) {
    return this.http.post(environment.url + "professores/" + idProfessor + "/salario-periodo/" + mes, null);
  }

  cadastrarRecebimentoParcial(idProfessor: number, idSalario) {
    return this.http.post(environment.url + "professores/" + idProfessor + "/salario/" + idSalario, null);
  }

}
