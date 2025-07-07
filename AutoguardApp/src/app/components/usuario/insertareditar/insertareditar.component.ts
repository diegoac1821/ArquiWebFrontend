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
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      correo_electronico: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required, this.mayorDeEdadValidator]],
      edad: ['', []], // sin validaciones, se oculta y se calcula
      telefono: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      enabled: [true, Validators.required],
    });

    // Calcula la edad automáticamente
    this.form.get('fechaNacimiento')?.valueChanges.subscribe((fecha: Date) => {
      if (fecha) {
        const edadCalculada = this.calcularEdad(fecha);
        this.form.get('edad')?.setValue(edadCalculada, { emitEvent: false });
      }
    });
  }

  mayorDeEdadValidator(control: FormControl) {
    const fechaNacimiento = new Date(control.value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    const dia = hoy.getDate() - fechaNacimiento.getDate();
    const cumple18 =
      edad > 18 || (edad === 18 && (mes > 0 || (mes === 0 && dia >= 0)));
    return cumple18 ? null : { menorDeEdad: true };
  }

  calcularEdad(fecha: Date): number {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  aceptar() {
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
        this.uS.update(this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => this.uS.setList(data));
          this.router.navigate(['/usuario/listarusuario']);
        });
      } else {
        this.uS.insert(this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => this.uS.setList(data));
          this.router.navigate(['/usuario/listarusuario']);
        });
      }
    }
  }

  cancelar() {
    this.router.navigate(['/usuario/listarusuario']);
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.usuario = data;
        this.form = this.formBuilder.group({
          dni: [data.dni, [Validators.required, Validators.pattern(/^\d{8}$/)]],
          nombres: [data.nombres, Validators.required],
          apellidos: [data.apellidos, Validators.required],
          direccion: [data.direccion, Validators.required],
          correo_electronico: [
            data.correo_electronico,
            [Validators.required, Validators.email],
          ],
          fechaNacimiento: [
            data.fechaNacimiento,
            [Validators.required, this.mayorDeEdadValidator],
          ],
          edad: [data.edad],
          telefono: [
            data.telefono,
            [Validators.required, Validators.pattern(/^9\d{8}$/)],
          ],
          username: [data.username, [Validators.required, Validators.minLength(4)]],
          password: [data.password],
          enabled: [data.enabled],
        });
      });
    }
  }
}
