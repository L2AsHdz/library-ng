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
import {Book, User} from "../../../../models/model";
import {UserDialogComponent} from "../../components/user-dialog/user-dialog.component";
import {AuthService} from "../../../auth/auth.service";
import {BookService} from "../../services/book.service";
import {BookDialogComponent} from "../../components/book-dialog/book-dialog.component";

@Component({
  selector: 'app-user-management',
  templateUrl: './book-management.component.html',
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
export class BookManagementComponent implements OnInit, OnDestroy {

  private bookService: BookService = inject(BookService);
  private authService: AuthService = inject(AuthService);
  private dialogService: DialogService = inject(DialogService);
  private messageService: MessageService = inject(MessageService);

  ref: DynamicDialogRef | undefined;
  books$!: Observable<Book[]>;
  selectedBook!: Book;
  items!: MenuItem[];

  ngOnInit() {
    this.books$ = this.bookService.getBooks();
    this.items = [
      { label: 'Edit', icon: 'pi pi-fw pi-user-edit', command: () => this.editBook(this.selectedBook) },
      { label: 'Change Stock', icon: 'pi pi-fw pi-sync', command: () => this.changeStock(this.selectedBook) }
    ];
  }

  changeStock(book: Book) {
    this.bookService.changeBookStock(book.id, book.stock).subscribe({
      next: () => {
        this.books$ = this.bookService.getBooks();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Stock changed successfully' });
      },
      error: (e) => {
        this.messageService.add({severity:'error', summary:e.error.title, detail:'An error occurred while changing the stock'});
      }
    });
  }

  editBook(book: Book){
    this.ref = this.dialogService.open(BookDialogComponent, {
      header: 'Edit book',
      width: '50vw',
      height: '16vw',
      contentStyle: { overflow: 'hidden' },
      data: {
        selectedBook: this.selectedBook,
        labelButton: 'Update book'
      }
    });

    this.ref.onClose.subscribe((book: Book) => {
      if (book) {
        this.bookService.updateCareer(book).subscribe({
          next: () => {
            this.books$ = this.bookService.getBooks();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Book updated successfully' });
          },
          error: (e) => {
            if (e.error.errors){
              e.error.errors.forEach((error: any) => {
                this.messageService.add({severity: 'error', summary: e.error.title, detail: error.message});
              });
            }
            else
              this.messageService.add({severity:'error', summary:e.error.title, detail:'An error occurred while updating the book'});
          }
        });
      }
      else {
        this.books$ = this.bookService.getBooks();
      }
    });
  }

  showDialog() {
    this.ref = this.dialogService.open(BookDialogComponent, {
      header: 'Add new book',
      width: '50vw',
      height: '16vw',
      contentStyle: { overflow: 'hidden' },
      data: {
        selectedBook: null,
        labelButton: 'Save book'
      }
    });

    this.ref.onClose.subscribe((book: Book) => {
      if (book) {
        this.bookService.createBook(book).subscribe({
          next: () => {
            this.books$ = this.bookService.getBooks();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Book saved successfully' });
          },
          error: (e) => {
            if (e.error.errors){
              e.error.errors.forEach((error: any) => {
                this.messageService.add({severity: 'error', summary: e.error.title, detail: error.message});
              });
            }
            else
              this.messageService.add({severity:'error', summary:e.error.title, detail:'An error occurred while saving the book'});
          }
        });
      }
      else {
        this.books$ = this.bookService.getBooks();
      }
    });
  }

  clear(table: Table) {
    table.clear();
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

}
