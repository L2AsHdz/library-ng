import {Component, inject, OnInit} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {FormsModule, NgForm} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {PasswordModule} from "primeng/password";
import {Credentials} from "../../../../models/model";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {InputValidationComponent} from "../../../../commons/components/input-validation/input-validation.component";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    FormsModule,
    PasswordModule,
    InputValidationComponent,
    ToastModule
  ],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  private messageService: MessageService = inject(MessageService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  credentials: Credentials = new Credentials();

  constructor() { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
      return;
    }
  }

  onSubmit(form: NgForm): void {
    this.credentials = form.value;

    this.authService.login(this.credentials)
      .subscribe({
        next: response => {
          window.location.reload();
        },
        error: error => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Invalid credentials'});
        }
      });
  }
}
