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
import {Book, Career, Loan, User} from "../../../../models/model";
import {AuthService} from "../../../auth/auth.service";
import {BookService} from "../../../admin/services/book.service";
import {CareerDialogComponent} from "../../components/career-dialog/career-dialog.component";
import {LoanService} from "../../services/loan.service";
import {NewLoanDialogComponent} from "../../components/new-loan-dialog/new-loan-dialog.component";

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
  private loanService: LoanService = inject(LoanService);
  private dialogService: DialogService = inject(DialogService);
  private messageService: MessageService = inject(MessageService);

  ref: DynamicDialogRef | undefined;
  books$!: Observable<Book[]>;
  selectedBook!: Book;
  items!: MenuItem[];

  ngOnInit() {
    this.books$ = this.bookService.booksWithStock(0);
    this.items = [
      { label: 'Lend Book', icon: 'pi pi-fw pi-box', command: () => this.showDialog() }
    ];
  }

  showDialog() {
    this.ref = this.dialogService.open(NewLoanDialogComponent, {
      header: 'Lend a book',
      width: '25vw',
      height: '15vw',
      contentStyle: { overflow: 'hidden' },
      data: {
        labelButton: 'Validate Student'
      }
    });

    this.ref.onClose.subscribe((studentId: number) => {
      if (studentId) {
        let newLoan = new Loan();
        newLoan.studentId = studentId;
        newLoan.bookId = this.selectedBook.id;
        this.loanService.createLoan(newLoan).subscribe({
          next: () => {
            this.books$ = this.bookService.getBooks();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Loan saved successfully' });
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
