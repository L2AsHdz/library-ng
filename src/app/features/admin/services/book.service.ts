import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../../../models/model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}/v1/books`;

  public getBooks() {
    return this.http.get<Book[]>(`${this.baseUrl}`);
  }

  public changeBookStock(id: number, newStock: number) {
    return this.http.put(`${this.baseUrl}/stock/${id}/${newStock}`, null);
  }

  public createBook(book: Book) {
    return this.http.post<Book>(`${this.baseUrl}`, book);
  }

  public updateCareer(book: Book) {
    return this.http.put<Book>(`${this.baseUrl}/${book.id}`, book);
  }

  public booksWithStock(quantity: number){
    return this.http.get<Book[]>(`${this.baseUrl}/with-stock/${quantity}`);
  }

  public booksWithOutStock(quantity: number){
    return this.http.get<Book[]>(`${this.baseUrl}/out-of-stock/${quantity}`);
  }

}
