import { ConsultaFuncionario } from './../models/consulta-funcionario';
import { FuncionarioService } from './../servicos/funcionario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta-funcionario',
  templateUrl: './consulta-funcionario.component.html',
  styleUrls: ['./consulta-funcionario.component.scss']
})
export class ConsultaFuncionarioComponent implements OnInit {

  
  private funconarios: ConsultaFuncionario[];
  private filtro: string;

  constructor(private funcionarioService: FuncionarioService) { 
    this.funconarios = [];
    this.filtro = "";
  }

  ngOnInit() {
    this.funcionarioService.getFuncionarios().subscribe(res =>{
      this.funconarios = res;
    })
  }
  getFunconarios(){
     return this.funconarios.filter((funcionario) => {
      if (funcionario.nome.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1)
        return true;
      if (funcionario.cpf.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1)
        return true;
      if (funcionario.email.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1)
        return true;
    });
  }


}
