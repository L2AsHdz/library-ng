import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private jwtHelper: JwtHelperService;
  constructor() {
    this.jwtHelper = new JwtHelperService();
  }

  public decodeToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }

  public getClaim(claim: string) {
    const token = localStorage.getItem('token');
    const decodedToken = this.decodeToken(token!);
    return decodedToken ? decodedToken[claim] : null;
  }

  public isTokenExpired(token: string) {
    return this.jwtHelper.isTokenExpired(token);
  }
}
