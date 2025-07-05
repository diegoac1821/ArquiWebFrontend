import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,RouterModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
  usuario: any = {
    dni: '',
    nombres: '',
    apellidos: '',
    direccion: '',
    correoElectronico: '',
    fechaNacimiento: '',
    telefono: '',
    username: '',
    password: ''
  };

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  registrar(): void {
    // Aquí puedes agregar validaciones si deseas

    this.usuarioService.insert(this.usuario).subscribe({
      next: () => {
        this.snackBar.open('Usuario registrado con éxito', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/login']);
      },
      error: () => {
        this.snackBar.open('Error al registrar usuario', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }
}
