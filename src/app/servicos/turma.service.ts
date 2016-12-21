import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TurmaService {

  constructor(private http: Http) { }

   getDiasAulas() {
    
    return this.http.get('json/dias.json')
      .map((response: Response) => <DiasAulas[]>response.json());
  }

  getSalas()
  {
    return this.http.get('json/salas.json')
      .map((response: Response) => <Salas[]>response.json());
  }

}

export class DiasAulas {
  constructor(
    public nome: String,
    public valor: number,
    public check: boolean
  ) { }}

export class Salas{
  constructor(
    public id: number,
    public nome: String
  ){}
}