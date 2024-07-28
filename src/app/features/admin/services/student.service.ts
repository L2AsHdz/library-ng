import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Student, User} from "../../../models/model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = `${environment.apiUrl}/v1/students`;

  public getStudents() {
    return this.http.get<Student[]>(`${this.baseUrl}`);
  }

  public changeStudentStatus(id: number, status: boolean) {
    return this.http.put(`${this.baseUrl}/${status ? 'disable' : 'enable'}/${id}`, {status});
  }

  public updateStudent(student: Student) {
    return this.http.put<Student>(`${this.baseUrl}/${student.id}`, student);
  }

}
