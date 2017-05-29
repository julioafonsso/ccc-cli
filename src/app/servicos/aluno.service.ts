import { ConsultaAulaParticular } from './../models/consulta-aula-particular';
import { CadastroAulaParticular } from './../models/cadastro-aula-particular';
import { ConsultaMensalidades } from './../models/consulta-mensalidades';
import { ConsultaMatricula } from './../models/consulta-matricula';
import { ConsultaAlunos } from './../models/consulta-alunos';
import { CadastroAluno } from './../models/cadastro-aluno';
import { FileUploader } from 'ng2-file-upload';
import { HttpCustormerService } from './http-custormer.service';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { EstadoCivil } from './../models/estado-civil';
import { ConheceEscola } from './../models/conhece-escola';
import { environment } from './../../environments/environment';

@Injectable()
export class AlunoService {

  constructor(private http: HttpCustormerService) { }

  getListaEstadoCivil() {
    return this.http.get(environment.url + "estado-civil")
      .map((response: Response) => <EstadoCivil[]>response.json())
  }
  getListaComoConheceu() {
    return this.http.get(environment.url + "conhece-escola")
      .map((response: Response) => <ConheceEscola[]>response.json())
  }

  cadastrar(aluno: CadastroAluno) {
    return this.http.post(environment.url + "alunos", aluno);
  }

  alterar(aluno: CadastroAluno) {
    return this.http.put(environment.url + "alunos", aluno);
  }

  getAlunos() {
    return this.http.get(environment.url + "alunos").map((response: Response) => <ConsultaAlunos[]>response.json());
  }

  getAluno(idAluno: number) {
    return this.http.get(environment.url + "alunos/" + idAluno).map((response: Response) => <ConsultaAlunos>response.json());
  }

  getMatriculas(idAluno: number) {
    return this.http.get(environment.url + "alunos/" + idAluno + "/turmas").map((response: Response) => <ConsultaMatricula[]>response.json());
  }

  getDebitos(idAluno: number) {
    return this.http.get(environment.url + "alunos/" + idAluno + "/debitos").map((response: Response) => <ConsultaMensalidades[]>response.json());
  }

  pagarMensalidade(idMensalidade: number, valor: number, idAluno: number) {
    let objeto: Number = new Number(valor);
    
    return this.http.post(environment.url + "alunos/" + idAluno + "/debitos/" + idMensalidade + "/pagamento", objeto);
  }

  getPagamentos(idAluno: number, dataInicio:string, dataFim: string){
     return this.http.get(environment.url + "alunos/" + idAluno + "/pagamentos/"+ dataInicio + "/" +dataFim).map((response: Response) => <ConsultaMensalidades[]>response.json());
  }

  getWorkShops(idAluno: number, dataInicio:string, dataFim: string){
     return this.http.get(environment.url + "alunos/" + idAluno + "/workshop/"+ dataInicio + "/" +dataFim).map((response: Response) => <ConsultaMatricula[]>response.json());
  }

  pesquisarAlunos(nome: string, email: string, cpf: string) {

    let params: URLSearchParams = new URLSearchParams();
    params.set('nome', nome);
    params.set('email', email);
    params.set('cpf', cpf);

    return this.http.get(environment.url + "alunos", params).map((response: Response) => <ConsultaAlunos[]>response.json());
  }

  cadastrarAulaParticular(idAluno: number, aula: CadastroAulaParticular){
    
    return this.http.post(environment.url + "alunos/" + idAluno + "/aula-particular", aula);
  }

getAulasParticulares(idAluno: number, dataInicio:string, dataFim: string)
{
  return this.http.get(environment.url + "alunos/" + idAluno + "/aula-particular/"+ dataInicio + "/" +dataFim).map((response: Response) => <ConsultaAulaParticular[]>response.json()); 
}

  
}


