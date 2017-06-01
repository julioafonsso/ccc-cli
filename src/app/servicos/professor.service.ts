import { ConsultaComissao } from './../models/consulta-comissao';
import { ConsultaRecebimentos } from './../models/consulta-recebimentos';
import { ConsultaTurma } from './../models/consulta-turmas';
import { ConsultaProfessor } from './../models/consulta-professor';
import { CadastroProfessor } from './../models/cadastro-professor';
import { DatePipe } from '@angular/common';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Salario } from './../models/salario';
import { environment } from './../../environments/environment';
import { HttpCustormerService } from './http-custormer.service';



@Injectable()
export class ProfessorService {

  constructor(private http: HttpCustormerService) { }

  atualizarProfessor(professor: CadastroProfessor) {
    return this.http.put(environment.url + "/professores", professor);
  }

  cadastrarProfessor(professor: CadastroProfessor) {
    return this.http.post(environment.url + "/professores", professor);
  }

  getMensalidadesParaReceber(idProfessor: number, mesReferencia:string) {
    return this.http.get(environment.url + "/professores/" + idProfessor + "/salario-pendente/" + mesReferencia)
      .map((res: Response) => <ConsultaComissao[]>res.json());
  }

  getProfessores() {
      return this.http.get(environment.url + "professores")
        .map((response: Response) => <ConsultaProfessor[]>response.json())
  }

  getProfessor(idProfessor: number) {
      return this.http.get(environment.url + "/professores/" + idProfessor).map((response: Response) => <ConsultaProfessor>response.json());
  }

  getRecebimentos(idProfessor: number, dataInicio: string, dataFim: string){
    return this.http.get(environment.url + "professores/" + idProfessor + "/recibos/"+ dataInicio + "/" +dataFim).map((response: Response) => <ConsultaRecebimentos[]>response.json());
  }

  getTurmaProfessor(idProfessor: number) {
      return this.http.get(environment.url + "professores/" + idProfessor + "/turmas").map((response: Response) => <ConsultaTurma[]>response.json());
  }

  getDetalheRecebimento(idFluxo: number){
    return this.http.get(environment.url + "professores/detalhe-pagamento/"+ idFluxo).map((response: Response) => <ConsultaComissao[]>response.json());
  }
  cadastrarRecebimento(idProfessor: number,mes: string ) {
    return this.http.post(environment.url + "professores/" + idProfessor + "/salario-periodo/" + mes, null);
  }

  cadastrarRecebimentoParcial(idProfessor: number, idSalario) {
    return this.http.post(environment.url + "professores/" + idProfessor + "/salario/" + idSalario, null);
  }

}
