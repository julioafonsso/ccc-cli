import { ConsultaFuncionario } from './../models/consulta-funcionario';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';


import { environment } from './../../environments/environment';
import { HttpCustormerService } from './http-custormer.service';
import { CadastroFuncionario } from './../models/cadastro-funcionario';

@Injectable()
export class FuncionarioService {

  constructor(private http: HttpCustormerService) { }

  atualizarFuncionario(funcionario: CadastroFuncionario) {
    return this.http.put(environment.url + "/funcionarios" + funcionario.id, funcionario);
  }

  cadastrarFuncionario(funcionario: CadastroFuncionario) {
    return this.http.post(environment.url + "/funcionarios/" , funcionario);
  }

getFuncionarios(){
  return this.http.get(environment.url + "/funcionarios/" )
  .map((response: Response) => <ConsultaFuncionario[]>response.json())
}

getFucionario(id :number)
{
  return this.http.get(environment.url + "/funcionarios/" + id)
  .map((response: Response) => <ConsultaFuncionario>response.json())
}


}
