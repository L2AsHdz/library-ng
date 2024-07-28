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
import {UserService} from "../../services/user.service";
import {User} from "../../../../models/model";
import {UserDialogComponent} from "../../components/user-dialog/user-dialog.component";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
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
export class UserManagementComponent implements OnInit, OnDestroy {

  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);
  private dialogService: DialogService = inject(DialogService);
  private messageService: MessageService = inject(MessageService);

  roles: any[] = ['ADMIN', 'LIBRARIAN'];
  ref: DynamicDialogRef | undefined;
  users$!: Observable<User[]>;
  selectedUser!: User;
  items!: MenuItem[];

  ngOnInit() {
    this.users$ = this.userService.getUsers();
    this.items = [
      { label: 'Edit', icon: 'pi pi-fw pi-user-edit', command: () => this.editUser(this.selectedUser) },
      { label: 'Change Status', icon: 'pi pi-fw pi-sync', command: () => this.changeStatus(this.selectedUser) },
      { label: 'Change Password', icon: 'pi pi-fw pi-key', command: () => console.log('Change Password!') }
    ];
  }

  changeStatus(user: User) {
    this.userService.changeUserStatus(user.id, user.status).subscribe({
      next: () => {
        this.users$ = this.userService.getUsers();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Status changed successfully' });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  editUser(user: User){
    this.ref = this.dialogService.open(UserDialogComponent, {
      header: 'Edit user',
      width: '50vw',
      height: '16vw',
      contentStyle: { overflow: 'hidden' },
      data: {
        selectedUser: this.selectedUser,
        labelButton: 'Update user'
      }
    });

    this.ref.onClose.subscribe((user: User) => {
      if (user) {
        this.userService.updateUser(user).subscribe({
          next: () => {
            this.users$ = this.userService.getUsers();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully' });
          },
          error: (e) => {
            if (e.error.errors){
              e.error.errors.forEach((error: any) => {
                this.messageService.add({severity: 'error', summary: e.error.title, detail: error.message});
              });
            }
            else
              this.messageService.add({severity:'error', summary:e.error.title, detail:'An error occurred while updating the user'});
          }
        });
      }
      else {
        this.users$ = this.userService.getUsers();
      }
    });
  }

  showDialog() {
    this.ref = this.dialogService.open(UserDialogComponent, {
      header: 'Add new user',
      width: '50vw',
      height: '16vw',
      contentStyle: { overflow: 'hidden' },
      data: {
        selectedUser: null,
        labelButton: 'Save user'
      }
    });

    this.ref.onClose.subscribe((user: User) => {
      if (user) {
        this.authService.registerUser(user).subscribe({
          next: () => {
            this.users$ = this.userService.getUsers();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User saved successfully' });
          },
          error: (e) => {
            if (e.error.errors){
              e.error.errors.forEach((error: any) => {
                this.messageService.add({severity: 'error', summary: e.error.title, detail: error.message});
              });
            }
            else
              this.messageService.add({severity:'error', summary:e.error.title, detail:'An error occurred while saving the user'});
          }
        });
      }
      else {
        this.users$ = this.userService.getUsers();
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
