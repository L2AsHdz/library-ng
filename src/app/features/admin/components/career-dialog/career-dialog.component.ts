import {Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {PasswordModule} from "primeng/password";
import {Career, User} from "../../../../models/model";
import {FormsModule} from "@angular/forms";
import {InputSwitchModule} from "primeng/inputswitch";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {KeyFilterModule} from "primeng/keyfilter";
import {InputValidationComponent} from "../../../../commons/components/input-validation/input-validation.component";
import {CalendarModule} from "primeng/calendar";

@Component({
  selector: 'app-career-dialog',
  templateUrl: './career-dialog.component.html',
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
export class CareerDialogComponent implements OnInit{

  private config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);

  career!: Career;
  labelButton: string = 'Save career';

  ngOnInit() {
    this.career = this.config.data.selectedCareer ?? new Career();
    this.labelButton = this.config.data.labelButton ?? 'Save career';
  }

  onSubmit() {
    this.ref.close(this.career);
  }

}
