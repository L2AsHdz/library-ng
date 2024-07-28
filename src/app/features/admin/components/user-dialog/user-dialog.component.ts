import {Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {User} from "../../../../models/model";
import {FormsModule} from "@angular/forms";
import {InputSwitchModule} from "primeng/inputswitch";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {KeyFilterModule} from "primeng/keyfilter";
import {InputValidationComponent} from "../../../../commons/components/input-validation/input-validation.component";
import {CalendarModule} from "primeng/calendar";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
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
export class UserDialogComponent implements OnInit{

  private config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);

  emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  roleRegex: RegExp = /^ADMIN|STUDENT|LIBRARIAN$/;
  passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;

  user!: User;
  labelButton: string = 'Save user';

  roles: string[] = ['ADMIN', 'STUDENT', 'LIBRARIAN'];

  ngOnInit() {
    this.user = this.config.data.selectedUser ?? new User();
    this.labelButton = this.config.data.labelButton ?? 'Save user';
  }

  onSubmit() {
    this.ref.close(this.user);
  }

  saveUser() {
    this.ref.close(this.user);
  }

}
