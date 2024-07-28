import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Table, TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {TagModule} from "primeng/tag";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {Observable, tap} from "rxjs";
import {ContextMenuModule} from "primeng/contextmenu";
import {MenuItem} from "primeng/api/menuitem";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {DialogService, DynamicDialogModule, DynamicDialogRef} from "primeng/dynamicdialog";
import {Student} from "../../../../models/model";
import {UserDialogComponent} from "../../components/user-dialog/user-dialog.component";
import {AuthService} from "../../../auth/auth.service";
import {StudentService} from "../../services/student.service";
import {StudentDialogComponent} from "../../components/student-dialog/student-dialog.component";

@Component({
  selector: 'app-user-management',
  templateUrl: './student-management.component.html',
  styles: [],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TagModule,
    CardModule,
    InputTextModule,
    MultiSelectModule,
    ToastModule,
    DynamicDialogModule,
    ContextMenuModule
  ],
  providers: [MessageService, DialogService]
})
export class StudentManagementComponent implements OnInit, OnDestroy {

  private studentService: StudentService = inject(StudentService);
  private authService: AuthService = inject(AuthService);
  private dialogService: DialogService = inject(DialogService);
  private messageService: MessageService = inject(MessageService);

  ref: DynamicDialogRef | undefined;
  students$!: Observable<Student[]>;
  selectedStudent!: Student;
  items!: MenuItem[];

  ngOnInit() {
    this.students$ = this.studentService.getStudents();
    this.items = [
      { label: 'Edit', icon: 'pi pi-fw pi-user-edit', command: () => this.editUser(this.selectedStudent) },
      { label: 'Change Status', icon: 'pi pi-fw pi-sync', command: () => this.changeStatus(this.selectedStudent) },
    ];
  }

  changeStatus(student: Student) {
    this.studentService.changeStudentStatus(student.id, student.status).subscribe({
      next: () => {
        this.students$ = this.studentService.getStudents();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Status changed successfully' });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  editUser(student: Student){
    this.ref = this.dialogService.open(StudentDialogComponent, {
      header: 'Edit student',
      width: '50vw',
      height: '16vw',
      contentStyle: { overflow: 'hidden' },
      data: {
        selectedStudent: this.selectedStudent,
        labelButton: 'Update student'
      }
    });

    this.ref.onClose.subscribe((student: Student) => {
      if (student) {
        this.studentService.updateStudent(student).subscribe({
          next: () => {
            this.students$ = this.studentService.getStudents();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Student updated successfully' });
          },
          error: (e) => {
            if (e.error.errors){
              e.error.errors.forEach((error: any) => {
                this.messageService.add({severity: 'error', summary: e.error.title, detail: error.message});
              });
            }
            else
              this.messageService.add({severity:'error', summary:e.error.title, detail:'An error occurred while updating the student'});
          }
        });
      }
      else {
        this.students$ = this.studentService.getStudents();
      }
    });
  }

  showDialog() {
    this.ref = this.dialogService.open(StudentDialogComponent, {
      header: 'Add new student',
      width: '50vw',
      height: '16vw',
      contentStyle: { overflow: 'hidden' },
      data: {
        selectedStudent: null,
        labelButton: 'Save student'
      }
    });

    this.ref.onClose.subscribe((student: Student) => {
      if (student) {
        this.authService.registerUser(student).subscribe({
          next: () => {
            this.students$ = this.studentService.getStudents();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Student saved successfully' });
          },
          error: (e) => {
            if (e.error.errors){
              e.error.errors.forEach((error: any) => {
                this.messageService.add({severity: 'error', summary: e.error.title, detail: error.message});
              });
            }
            else
              this.messageService.add({severity:'error', summary:e.error.title, detail:'An error occurred while saving the student'});
          }
        });
      }
      else {
        this.students$ = this.studentService.getStudents();
      }
    });
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'help';
      default:
        return 'secondary';
    }
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

}
