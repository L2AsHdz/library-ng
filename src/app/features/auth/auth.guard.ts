import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  constructor() {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const requireAuthentication: boolean = route.data['requireAuthentication'] || false;

    if (requireAuthentication && !this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRol: string = route.data['requiredRol'];
    if (requiredRol && !this.authService.hasRequiredRol(requiredRol)) {
      this.router.navigate(['/homepage']);
      return false;
    }

    return true;
  }
}
