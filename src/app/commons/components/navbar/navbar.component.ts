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
      label: 'Upload data',
      icon: 'pi pi-fw pi-upload',
      routerLink: '/admin/upload-data',
    },
    {
      label: 'Salir',
      icon: 'pi pi-fw pi-power-off',
      routerLink: '/logout',
    },
  ];
}
