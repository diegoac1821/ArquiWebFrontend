import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  providers: [], 
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatButtonModule,
    RouterModule
  ],
})
export class RegistroComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      correo_electronico: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required, this.mayorDeEdadValidator]],
      telefono: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  mayorDeEdadValidator(control: FormControl) {
    const fechaNacimiento = new Date(control.value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const m = hoy.getMonth() - fechaNacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    return edad >= 18 ? null : { menorDeEdad: true };
  }

  calcularEdad(fecha: Date): number {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  registrar(): void {
    if (this.form.valid) {
      const datos = this.form.value;
      const usuario: Usuario = {
        id: 0,
        dni: datos.dni,
        nombres: datos.nombres,
        apellidos: datos.apellidos,
        direccion: datos.direccion,
        correo_electronico: datos.correo_electronico,
        fechaNacimiento: datos.fechaNacimiento,
        edad: this.calcularEdad(datos.fechaNacimiento),
        telefono: datos.telefono,
        username: datos.username,
        password: datos.password,
        enabled: true,
      };

      this.usuarioService.insert(usuario).subscribe(() => {
        this.router.navigate(['/login']);
      });
    }
  }
}
