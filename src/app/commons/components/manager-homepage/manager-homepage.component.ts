import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../features/auth/auth.service";

@Component({
  selector: 'app-manager-homepage',
  template: ``,
  styles: [``],
  standalone: true
})
export class ManagerHomepageComponent implements OnInit{

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  constructor() { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
      return;
    }
    this.router.navigate(['/login']);
  }
}
