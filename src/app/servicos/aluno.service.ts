import { AulaParticular } from './../models/aula-particular';
import { FileUploader } from 'ng2-file-upload';
import { HttpCustormerService } from './http-custormer.service';
import { Mensalidade } from './../models/mensalidade';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { Matricula } from './../models/maticula';
import { Turma } from './../models/turma';
import { EstadoCivil } from './../models/estado-civil';
import { ConheceEscola } from './../models/conhece-escola';
import { Aluno } from './../models/aluno';
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

  cadastrar(aluno: Aluno) {
    return this.http.post(environment.url + "alunos", aluno);
  }

  alterar(aluno: Aluno) {
    return this.http.put(environment.url + "alunos", aluno);
  }

  getAlunos() {
      return this.http.get(environment.url + "alunos").map((response: Response) => <Aluno[]>response.json());
  }

  getMatriculas(idAluno: number) {
      return this.http.get(environment.url + "alunos/" + idAluno + "/turmas").map((response: Response) => <Matricula[]>response.json());
  }

  getAluno(idAluno: number) {
      return this.http.get(environment.url + "alunos/" + idAluno).map((response: Response) => <Aluno>response.json());
  }

  pesquisarAlunos(nome: string, email: string, cpf: string) {

    let params: URLSearchParams = new URLSearchParams();
    params.set('nome', nome);
    params.set('email', email);
    params.set('cpf', cpf);

      return this.http.get(environment.url + "alunos", params).map((response: Response) => <Aluno[]>response.json());
  }

  getDebitos(idAluno: number) {
    return this.http.get(environment.url + "alunos/" + idAluno + "/debitos")
      .map((response: Response) => <Mensalidade[]>response.json());
  }

  getAulasParticulares(idAluno: number, dataInicio: string, dataFim: string) {
    return this.http.get(environment.url + "alunos/" + idAluno + "/aula-particular/"+ dataInicio+"/" + dataFim)
      .map((response: Response) => <Mensalidade[]>response.json());
  }

  getPagamentos(idAluno: number, dataInicio: string, dataFim: string) {
    return this.http.get(environment.url + "alunos/" + idAluno + "/pagamentos/"+ dataInicio+"/" + dataFim)
      .map((response: Response) => <Mensalidade[]>response.json());
  }

  cadastrarAulaParticular(turma: Turma, idAluno: number, qtd : number)
  {
    let aula = new AulaParticular();
    aula.qtd = qtd;
    aula.turma = this.tratarDadosTurma(turma);
    return this.http.post(environment.url + "alunos/"+idAluno + "/aula-particular", aula);
  }

  pagarMensalidade(mensalidade: Mensalidade) {
    let pagamento = new Mensalidade();
    pagamento.id = mensalidade.id;
    pagamento.valorParaPagar = mensalidade.valorParaPagar;
    return this.http.post(environment.url + "alunos/pagamento", pagamento
    );
  }

   private tratarDadosTurma(turma: Turma) {
        let valor = turma.mensalidade.toString();
        if (valor.indexOf(",") < 0) {
            if (valor.indexOf(".") < 0)
                valor = valor + ",00";
        }
        let turma2: Turma = Object.assign({}, turma);
        valor = valor.replace(/[^0-9]/gi, '');
        turma2.mensalidade = Number(valor.substr(0, valor.length - 2) + "." + valor.substring(valor.length - 2))

        return turma2;
    }

}


