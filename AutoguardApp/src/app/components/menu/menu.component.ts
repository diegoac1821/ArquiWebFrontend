import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { LoginService } from '../../services/login.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';
import { AlertaService } from '../../services/alerta.service';
import { Alerta } from '../../models/alerta';
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
    MatBadgeModule 
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  role: string = '';
  logueado: boolean = false;
  username: string = '';
  userId: number = 0;

  alertasUsuario: Alerta[] = [];

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private alertaService: AlertaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verificar();

    if (this.username) {
      this.usuarioService.buscarPorUsername(this.username).subscribe({
        next: (usuario: Usuario) => {
          this.userId = usuario.id;

          this.alertaService.list().subscribe({
            next: (alertas: Alerta[]) => {
              this.alertasUsuario = alertas.filter(
                (a) => a.vehiculo?.usuario?.username === this.username
              );
            },
            error: (err) => {
              console.error('Error al obtener alertas:', err);
            }
          });
        },
        error: (err) => {
          console.error('Error al obtener usuario por username:', err);
        }
      });
    }
  }

  cerrar(): void {
    sessionStorage.clear();
    this.router.navigate(['/landing']);
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