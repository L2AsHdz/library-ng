import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Career, Student, User} from "../../../models/model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}/v1/careers`;

  public getCareers() {
    return this.http.get<Career[]>(`${this.baseUrl}`);
  }

  public changeCareerStatus(id: number, status: boolean) {
    return this.http.put(`${this.baseUrl}/${status ? 'disable' : 'enable'}/${id}`, {status});
  }

  public createCareer(career: Career) {
    return this.http.post<Career>(`${this.baseUrl}`, career);
  }

  public updateCareer(career: Career) {
    return this.http.put<Career>(`${this.baseUrl}/${career.id}`, career);
  }

}
