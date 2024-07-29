import {Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {Career, Student, User} from "../../../../models/model";
import {FormsModule} from "@angular/forms";
import {InputSwitchModule} from "primeng/inputswitch";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {KeyFilterModule} from "primeng/keyfilter";
import {InputValidationComponent} from "../../../../commons/components/input-validation/input-validation.component";
import {CalendarModule} from "primeng/calendar";
import {StudentService} from "../../services/student.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-career-dialog',
  templateUrl: './new-loan-dialog.component.html',
  styles: [],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    CardModule,
    InputTextModule,
    PaginatorModule,
    PasswordModule,
    InputSwitchModule,
    KeyFilterModule,
    CalendarModule,
    InputValidationComponent
  ],
})
export class NewLoanDialogComponent implements OnInit{

  private config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);

  private studentService: StudentService = inject(StudentService);
  private messageService: MessageService = inject(MessageService);

  student!: Student;
  labelButton: string = 'Validate Student';

  ngOnInit() {
    this.labelButton = this.config.data.labelButton ?? 'Validate Student';
    this.student = new Student();
  }

  onSubmit() {
    if (this.student.fullName){
      this.ref.close(this.student.id);
    } else {
      this.studentService.getStudentByAcademicNumber(this.student.academicNumber).subscribe({
        next: (student) => {
          this.student = student;
          this.labelButton = 'Save Loan';
        },
        error: (e) => {
          if (e.error.errors){
            e.error.errors.forEach((error: any) => {
              this.messageService.add({severity: 'error', summary: e.error.title, detail: error.message});
            });
          }
          else
            this.messageService.add({severity:'error', summary:e.error.title, detail:'An error occurred while saving the loan'});
        }
      });
    }
  }

}
