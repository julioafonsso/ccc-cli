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

}
