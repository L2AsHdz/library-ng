import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../../models/model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}/v1/users`;

  public getUsers() {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  public changeUserStatus(id: number, status: boolean) {
    return this.http.put(`${this.baseUrl}/${status ? 'disable' : 'enable'}/${id}`, {status});
  }

  public updateUser(user: User) {
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user);
  }

}
