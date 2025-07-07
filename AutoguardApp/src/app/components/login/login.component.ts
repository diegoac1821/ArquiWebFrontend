import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { JwtRequest } from '../../models/jwtRequest';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../services/usuario.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  username: string = '';
  password: string = '';
  mensaje: string = '';
  ngOnInit(): void {}
  login() {
    const request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;

    this.usuarioService.buscarPorUsername(this.username).subscribe(
      (usuario) => {
        if (!usuario.enabled) {
          this.snackBar.open(
            'Tu cuenta está deshabilitada. Contacta al administrador.',
            'Aviso',
            {
              duration: 3000,
            }
          );
          return;
        }
        this.loginService.login(request).subscribe(
          (data: any) => {
            sessionStorage.setItem('token', data.jwttoken);
            this.router.navigate(['homes']);
          },
          (error) => {
            this.snackBar.open('Credenciales incorrectas.', 'Aviso', {
              duration: 2000,
            });
          }
        );
      },
      (error) => {
        this.snackBar.open('No se encontró el usuario.', 'Aviso', {
          duration: 2000,
        });
      }
    );
  }
}
