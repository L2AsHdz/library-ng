import {Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {Career, Student} from "../../../../models/model";
import {FormsModule} from "@angular/forms";
import {InputSwitchModule} from "primeng/inputswitch";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {KeyFilterModule} from "primeng/keyfilter";
import {InputValidationComponent} from "../../../../commons/components/input-validation/input-validation.component";
import {CalendarModule} from "primeng/calendar";
import {CareerService} from "../../services/career.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './student-dialog.component.html',
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
export class StudentDialogComponent implements OnInit{

  private config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private careerService: CareerService = inject(CareerService);

  emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;

  student!: Student;
  careers$!: Observable<Career[]>;
  labelButton: string = 'Save student';

  ngOnInit() {
    this.student = this.config.data.selectedStudent ?? new Student();
    this.labelButton = this.config.data.labelButton ?? 'Save student';
    this.careers$ = this.careerService.getCareers();
  }

  onSubmit() {
    this.ref.close(this.student);
  }

  saveUser() {
    this.ref.close(this.student);
  }

}
