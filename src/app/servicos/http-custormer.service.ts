import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { LoginService } from './login.service';


@Injectable()
export class HttpCustormerService {

  constructor(private http: Http,
              private loginService: LoginService) { }

  createrHeader() {
    let header: Headers = new Headers();
    header.append('token', this.loginService.getToken());
    return header;
  }

  get(url: string, parametros?: any) {
    return this.http.get(url, {
      search: parametros,
      headers: this.createrHeader()
    });
  }

  post(url: string, parametro: any) {
    return this.http.post(url, parametro, {headers: this.createrHeader()});
  }

  delete(url: string, parametro?: any) {
    return this.http.delete(url, {
      headers: this.createrHeader(),
      body: parametro
    } );
  }

}
