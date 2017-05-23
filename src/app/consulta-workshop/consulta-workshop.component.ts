import { WorkshopService } from './../servicos/workshop.service';
import { ConsultaWorkShop } from './../models/consulta-workshop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta-workshop',
  templateUrl: './consulta-workshop.component.html',
  styleUrls: ['./consulta-workshop.component.css']
})
export class ConsultaWorkshopComponent implements OnInit {

private turmas: ConsultaWorkShop[];

  constructor(private workService: WorkshopService) { }

  ngOnInit() {
    this.workService.getWorkShops().subscribe(res => {
      this.turmas = res;
    })
  }

  getWorkShops(){
    return this.turmas;
  }

}
