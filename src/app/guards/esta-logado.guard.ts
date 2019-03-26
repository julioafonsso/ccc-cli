import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import { LoginService } from './../servicos/login.service';


@Injectable()
export class EstaLogadoGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    // this.loginService.usuarioLogado().subscribe(res => {
    //   if (!res)
    //     this.router.navigate(['/login']);
    // });

    // return this.loginService.usuarioLogado();
    return true;
  }

}