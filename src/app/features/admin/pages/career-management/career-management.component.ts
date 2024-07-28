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
import {Career} from "../../../../models/model";
import {AuthService} from "../../../auth/auth.service";
import {CareerService} from "../../services/career.service";
import {CareerDialogComponent} from "../../components/career-dialog/career-dialog.component";

@Component({
  selector: 'app-user-management',
  templateUrl: './career-management.component.html',
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
export class CareerManagementComponent implements OnInit, OnDestroy {

  private careerService: CareerService = inject(CareerService);
  private dialogService: DialogService = inject(DialogService);
  private messageService: MessageService = inject(MessageService);

  ref: DynamicDialogRef | undefined;
  careers$!: Observable<Career[]>;
  selectedCareer!: Career;
  items!: MenuItem[];

  ngOnInit() {
    this.careers$ = this.careerService.getCareers();
    this.items = [
      { label: 'Edit', icon: 'pi pi-fw pi-user-edit', command: () => this.editCareer(this.selectedCareer) },
    ];
  }

  editCareer(user: Career){
    this.ref = this.dialogService.open(CareerDialogComponent, {
      header: 'Edit career',
      width: '25vw',
      height: '10vw',
      contentStyle: { overflow: 'hidden' },
      data: {
        selectedCareer: this.selectedCareer,
        labelButton: 'Update career'
      }
    });

    this.ref.onClose.subscribe((career: Career) => {
      if (career) {
        this.careerService.updateCareer(career).subscribe({
          next: () => {
            this.careers$ = this.careerService.getCareers();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Career updated successfully' });
          },
          error: (e) => {
            this.messageService.add({ severity: 'error', summary: e.error.title, detail: e.error.detail });
            console.error(e);
          }
        });
      }
      else {
        this.careers$ = this.careerService.getCareers();
      }
    });
  }

  showDialog() {
    this.ref = this.dialogService.open(CareerDialogComponent, {
      header: 'Add new career',
      width: '25vw',
      height: '10vw',
      contentStyle: { overflow: 'hidden' },
      data: {
        selectedCareer: null,
        labelButton: 'Save career'
      }
    });

    this.ref.onClose.subscribe((career: Career) => {
      if (career) {
        this.careerService.createCareer(career).subscribe({
          next: () => {
            this.careers$ = this.careerService.getCareers();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Career saved successfully' });
          },
          error: (e) => {
            this.messageService.add({ severity: 'error', summary: e.error.title, detail: e.error.detail });
            console.log(e);
          }
        });
      }
      else {
        this.careers$ = this.careerService.getCareers();
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
