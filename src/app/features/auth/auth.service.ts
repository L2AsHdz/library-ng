import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {JwtService} from "./jwt.service";
import {map} from "rxjs";
import {Credentials} from "../../models/model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURl = environment.apiUrl;

  private http: HttpClient = inject(HttpClient);
  private jwtService: JwtService = inject(JwtService);

  constructor() {
  }

  getToken() {
    let token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : null;
  }

  login(credentials: Credentials) {
    return this.http.post(`${this.baseURl}/v1/auth/signin`, credentials, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;

      const bearerToken = headers.get('Authorization');
      const token = bearerToken?.replace('Bearer ', '');

      localStorage.setItem('token', token!);

      return body;
    }))
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    return token && !this.jwtService.isTokenExpired(token);
  }

  hasRequiredRol(rol: string): boolean {
    let token = localStorage.getItem('token');
    if (!token) return false;

    let userRol = this.jwtService.getClaim('rol');
    return userRol === rol;
  }
}
