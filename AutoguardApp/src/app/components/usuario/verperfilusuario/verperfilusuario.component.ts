import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-verperfilusuario',
  standalone: true,
  templateUrl: './verperfilusuario.component.html',
  styleUrl: './verperfilusuario.component.css',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class VerperfilusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  id: number = 0;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Inicializa el formulario con los controles deshabilitados
    this.form = this.formBuilder.group({
      dni: new FormControl({ value: '', disabled: true }),
      nombres: new FormControl({ value: '', disabled: true }),
      apellidos: new FormControl({ value: '', disabled: true }),
      direccion: new FormControl({ value: '', disabled: true }),
      correo_electronico: new FormControl({ value: '', disabled: true }),
      fechaNacimiento: new FormControl({ value: '', disabled: true }),
      edad: new FormControl({ value: '', disabled: true }),
      telefono: new FormControl({ value: '', disabled: true }),
      username: new FormControl({ value: '', disabled: true }),
      enabled: new FormControl({ value: '', disabled: true })
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.init();
    });
  }

  init() {
    this.usuarioService.listId(this.id).subscribe((usuario: Usuario) => {
      console.log('Usuario recibido:', usuario);
      this.form.patchValue({
        dni: usuario.dni,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        direccion: usuario.direccion,
        correo_electronico: usuario.correo_electronico,
        fechaNacimiento: usuario.fechaNacimiento,
        edad: usuario.edad,
        telefono: usuario.telefono,
        username: usuario.username,
        enabled: usuario.enabled ? 'Sí' : 'No'
      });
    });
  }
}
