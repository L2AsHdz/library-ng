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
import {Book, User} from "../../../../models/model";
import {AuthService} from "../../../auth/auth.service";
import {BookService} from "../../../admin/services/book.service";

@Component({
  selector: 'app-user-management',
  templateUrl: './book-search.component.html',
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
export class BookSearchComponent implements OnInit, OnDestroy {

  private bookService: BookService = inject(BookService);
  private dialogService: DialogService = inject(DialogService);
  private messageService: MessageService = inject(MessageService);

  ref: DynamicDialogRef | undefined;
  books$!: Observable<Book[]>;
  selectedBook!: Book;
  items!: MenuItem[];

  ngOnInit() {
    this.books$ = this.bookService.booksWithStock(0);
    this.items = [
      { label: 'Reserve', icon: 'pi pi-fw pi-check-square', command: () => console.log("Reservar") }
    ];
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
