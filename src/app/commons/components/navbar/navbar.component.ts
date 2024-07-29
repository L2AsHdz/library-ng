import {Component, inject, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import {CommonModule} from "@angular/common";
import {MenubarModule} from "primeng/menubar";
import {ChipModule} from "primeng/chip";
import {AuthService} from "../../../features/auth/auth.service";
import {JwtService} from "../../../features/auth/jwt.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, MenubarModule, ChipModule]
})
export class NavbarComponent implements OnInit {

  authService: AuthService = inject(AuthService);
  jwtService: JwtService = inject(JwtService);
  items: MenuItem[] | undefined ;

  username:string = this.jwtService.getClaim('user');

  ngOnInit(): void {
    this.items = this.MenuItemFactory;
  }

  MenuItemFactory = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/homepage',
    },
    {
      label: 'Users management',
      icon: 'pi pi-fw pi-users',
      visible: this.authService.hasRequiredRol('ADMIN'),
      items:[
        {
          label: 'Users',
          icon: 'pi pi-fw pi-users',
          routerLink: '/admin/user-management',
        },
        {
          label: 'Students',
          icon: 'pi pi-fw pi-users',
          routerLink: '/admin/student-management',
        }
      ]
    },
    {
      label: 'Career management',
      icon: 'pi pi-fw pi-users',
      visible: this.authService.hasRequiredRol('ADMIN'),
      routerLink: '/admin/career-management',
    },
    {
      label: 'Book management',
      icon: 'pi pi-fw pi-book',
      visible: this.authService.hasRequiredRol('ADMIN'),
      routerLink: '/admin/book-management',
    },
    {
      label: 'Loan management',
      icon: 'pi pi-fw pi-book',
      visible: this.authService.hasRequiredRol('ADMIN'),
      items: [
        {
          label: 'New Loan',
          icon: 'pi pi-fw pi-book',
          visible: this.authService.hasRequiredRol('ADMIN'),
          routerLink: '/admin/new-loan',
        },
        {
          label: 'Finish Loan',
          icon: 'pi pi-fw pi-book',
          visible: this.authService.hasRequiredRol('ADMIN'),
          routerLink: '/admin/finish-loan',
        },
      ]
    },
    {
      label: 'Book Search',
      icon: 'pi pi-fw pi-book',
      visible: this.authService.hasRequiredRol('STUDENT'),
      routerLink: '/student/book-search',
    },
    {
      label: 'Quit',
      icon: 'pi pi-fw pi-sign-out',
      routerLink: '/logout',
    },
  ];
}
