import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpCustormerService {

  constructor(private http: Http) { }

  createrHeader() {
    let header: Headers = new Headers();
    header.append('token', 'abcdefgh');
    return header;
  }

  get(url: string, parametros?: any) {
    console.log("GET")
    return this.http.get(url, {
      search: parametros,
      headers: this.createrHeader()
    });
  }

  post(url: string, parametro: any) {
    console.log("POST")
    return this.http.post(url, parametro, {headers: this.createrHeader()});
  }

  delete(url: string, parametro?: any) {
    return this.http.delete(url, {
      headers: this.createrHeader(),
      body: parametro
    } );
  }

}
