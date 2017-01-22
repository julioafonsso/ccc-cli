import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import { LoginService } from './../servicos/login.service';



@Injectable()
export class PerfilSupervisorGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    this.loginService.usuarioEhSupervisor().subscribe(res => {
      if (!res){
        this.loginService.logoff();
        this.router.navigate(['/login']);
      }
        
    });

    return this.loginService.usuarioEhSupervisor();
  }

}