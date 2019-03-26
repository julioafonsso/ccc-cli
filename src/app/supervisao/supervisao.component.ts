import { SupervisaoService } from './../servicos/supervisao.service';
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-supervisao',
  templateUrl: './supervisao.component.html',
  styleUrls: ['./supervisao.component.css']
})
export class SupervisaoComponent implements OnInit {

  constructor(private supervisaoService: SupervisaoService) {
        this.msgs = [];
        this.submit = false;
   }

  private msgs: Message[];
  private submit: boolean;

  ngOnInit() {

  }

  recalcularComissoes(){
    this.submit = true;
    this.supervisaoService.recalcularComissoes().subscribe(res => {
      this.submit = false;
      this.msgs.push({ severity: 'success', summary: 'Comissoes Recalculadas !' });
    },error =>{
      this.submit = false;
      this.msgs.push({ severity: 'error', summary: 'Erro !' });
    })
  }

}
