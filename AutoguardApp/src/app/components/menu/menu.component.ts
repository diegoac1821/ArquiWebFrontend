import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LoginService } from '../../services/login.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  role: string = '';
  logueado: boolean = false;
  username: string = '';

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.verificar();
  }

  cerrar(): void {
    sessionStorage.clear();
  }

  verificar(): boolean {
    this.role = this.loginService.showRole() ?? '';
    this.username = this.loginService.getUsername() ?? '';
    this.logueado = this.loginService.verificar();
    return this.logueado;
  }

  esAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  esCliente(): boolean {
    return this.role === 'CLIENTE';
  }
}