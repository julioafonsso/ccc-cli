import { Bairro } from './../models/bairro';
import { Response } from '@angular/http';
import { environment } from './../../environments/environment';
import { HttpCustormerService } from './http-custormer.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BairroService {

  constructor(private http: HttpCustormerService) { }
  
  getBairro(id: number)
  {
    return this.http.get(environment.url + "bairros").map((response: Response) => <Bairro>response.json())
  }

  getBairros()
  {
    return this.http.get(environment.url + "bairros").map((response: Response) => <Bairro[]>response.json())
  }

  cadastrar(bairro: Bairro){
    return this.http.post(environment.url + "bairros" , bairro);
  }


  alterar(bairro: Bairro){
    return this.http.put(environment.url + "bairros" , bairro);
  }
}
