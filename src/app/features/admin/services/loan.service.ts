import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book, Loan} from "../../../models/model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}/v1/loans`;

  public createLoan(loan: Loan) {
    return this.http.post<Loan>(`${this.baseUrl}`, loan);
  }

}
