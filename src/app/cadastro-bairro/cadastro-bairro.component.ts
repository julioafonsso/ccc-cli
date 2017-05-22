import { BairroService } from './../servicos/bairro.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/primeng';
import { Bairro } from './../models/bairro';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-bairro',
  templateUrl: './cadastro-bairro.component.html',
  styleUrls: ['./cadastro-bairro.component.css']
})
export class CadastroBairroComponent implements OnInit {

  
  private bairro :Bairro;
  private msgs: Message[];
  private submit: boolean;
  constructor(private route: ActivatedRoute,private bairroService: BairroService) { 
    this.msgs = []
    this.bairro = new Bairro();
    this.submit =false
  }

  ngOnInit() {
    this.loadModalidade();
  }

  loadModalidade() {
    this.route.params.subscribe(
      (params: any) => {
        if (params['id'] != undefined) {
          this.submit = true;
          this.bairroService.getBairro(params['id']).subscribe(res => {
            this.bairro = res;
            this.submit = false;
          })
        }
      })
  }

  cadastrar(){
    if(this.bairro.id != null)
      return this.bairroService.alterar(this.bairro)
    return this.bairroService.cadastrar(this.bairro);
  }

  onSubmit() {
    this.submit = true;
    this.cadastrar()
      .subscribe(response => {
        this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
        this.bairro = new Bairro();
        this.submit = false;
      },
      error => {
        this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
        this.submit = false;
      })
  }

}
