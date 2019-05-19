import { HttpCustormerService } from './http-custormer.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class SupervisaoService {

  constructor(private http: HttpCustormerService) { }

  recalcularComissoes(){
    return this.http.post(environment.url + "/admin/recalcular-comissao" , null);
  }

}
