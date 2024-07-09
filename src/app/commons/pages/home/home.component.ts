import {Component, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AuthService} from "../../../features/auth/auth.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
  ],
  standalone: true
})
export class HomeComponent {

  authService: AuthService = inject(AuthService);

}
