import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  template: ``,
  styles: [``],
  standalone: true
})
export class LogoutComponent implements OnInit {

  private router: Router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
