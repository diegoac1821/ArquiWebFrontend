import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertareditar',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css',
})
export class InsertareditarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  estado: boolean = true;

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private uS: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      dni: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      correo_electronico: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      telefono: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      enabled: [true, Validators.required],
    });
  }

  aceptar() {
    console.log('👉 Se hizo clic en Aceptar');
    console.log('📝 Formulario válido:', this.form.valid);
    console.log('📦 Datos del formulario:', this.form.value);

    if (this.form.valid) {
      this.usuario.dni = this.form.value.dni;
      this.usuario.nombres = this.form.value.nombres;
      this.usuario.apellidos = this.form.value.apellidos;
      this.usuario.direccion = this.form.value.direccion;
      this.usuario.correo_electronico = this.form.value.correo_electronico;
      this.usuario.fechaNacimiento = this.form.value.fechaNacimiento;
      this.usuario.edad = this.form.value.edad;
      this.usuario.telefono = this.form.value.telefono;
      this.usuario.username = this.form.value.username;
      this.usuario.password = this.form.value.password;
      this.usuario.enabled = this.form.value.enabled;

      if (this.edicion) {
        this.usuario.id = this.id;

        // ✅ roles no se tocan, se preservan
        this.uS.update(this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
          this.router.navigate(['/usuario/listarusuario']);
        });
      } else {
        console.log('➕ Insertando nuevo usuario');
        this.uS.insert(this.usuario).subscribe(() => {
          console.log('✅ Usuario insertado');
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
          this.router.navigate(['/usuario/listarusuario']);
        });
      }
    } else {
      console.warn('❌ Formulario inválido');
    }
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.usuario = data; // ⬅️ Guardamos el usuario completo con roles
        this.form = new FormGroup({
          dni: new FormControl(data.dni),
          nombres: new FormControl(data.nombres),
          apellidos: new FormControl(data.apellidos),
          direccion: new FormControl(data.direccion),
          correo_electronico: new FormControl(data.correo_electronico),
          fechaNacimiento: new FormControl(data.fechaNacimiento),
          edad: new FormControl(data.edad),
          telefono: new FormControl(data.telefono),
          username: new FormControl(data.username),
          password: new FormControl(data.password),
          enabled: new FormControl(data.enabled),
        });
      });
    }
  }
}
//le