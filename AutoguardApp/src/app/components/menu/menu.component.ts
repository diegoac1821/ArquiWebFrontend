import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

import { LoginService } from '../../services/login.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

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
  userId: number = 0; // <- ID del usuario logueado

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.verificar();

    if (this.username) {
      this.usuarioService.buscarPorUsername(this.username).subscribe({
        next: (usuario: Usuario) => {
          this.userId = usuario.id;
        },
        error: (err) => {
          console.error('Error al obtener el usuario por username', err);
        }
      });
    }
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
