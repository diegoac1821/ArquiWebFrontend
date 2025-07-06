import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReclamoService } from '../../../services/reclamo.service';
import { Reclamo } from '../../../models/reclamo';
import { Usuario } from '../../../models/usuario';
import { LoginService } from '../../../services/login.service';
import { UsuarioService } from '../../../services/usuario.service';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-insertareditarreclamos',
  templateUrl: './insertareditarreclamos.component.html',
  styleUrl: './insertareditarreclamos.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
  ],
})
export class InsertareditarreclamosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  reclamo: Reclamo = new Reclamo();
  id: number = 0;
  edicion: boolean = false;
  usuario!: Usuario;
  esAdmin: boolean = false;

  constructor(
    private rS: ReclamoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const username = this.loginService.getUsername();
    const roles = this.loginService.showRole();

    this.esAdmin = roles !== null && roles.includes('ADMIN');

    if (username) {
      this.usuarioService.buscarPorUsername(username).subscribe((usuario) => {
        this.usuario = usuario;

        this.route.params.subscribe((data: Params) => {
          this.id = data['id'];
          this.edicion = this.id !== undefined && this.id !== null;

          if (this.edicion) {
            this.init();
          } else {
            this.form = this.formBuilder.group({
              asunto: [
                '',
                [
                  Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(100),
                ],
              ],
              fecha: [
                new Date(),
                [Validators.required, this.fechaNoFuturaValidator()],
              ],
              descripcion: [
                '',
                [
                  Validators.required,
                  Validators.minLength(10),
                  Validators.maxLength(500),
                  this.espaciosValidator(),
                ],
              ],
            });
          }
        });
      });
    }
  }

  aceptar() {
    if (this.form.valid) {
      this.reclamo.asunto = this.form.value.asunto;
      this.reclamo.fecha = this.form.value.fecha;
      this.reclamo.descripcion = this.form.value.descripcion;
      this.reclamo.usuario = this.usuario;

      if (this.edicion) {
        this.reclamo.id = this.id;
        if (this.esAdmin) {
          this.reclamo.resuelto = this.form.get('resuelto')?.value;
        }
        this.rS.update(this.reclamo).subscribe(() => {
          this.rS.list().subscribe((data) => this.rS.setList(data));
          this.router.navigate(['/reclamo/listarreclamo']);
        });
      } else {
        this.reclamo.resuelto = false;
        this.rS.insert(this.reclamo).subscribe(() => {
          this.rS.list().subscribe((data) => this.rS.setList(data));
          this.router.navigate(['/reclamo/listarreclamo']);
        });
      }
    }
  }

  cancelar() {
    this.router.navigate(['/reclamo/listarreclamo']);
  }

  init() {
    this.rS.listId(this.id).subscribe((data) => {
      this.reclamo = data;

      this.form = this.formBuilder.group({
        asunto: new FormControl(data.asunto, [Validators.required]),
        fecha: new FormControl(data.fecha, [
          Validators.required,
          this.fechaNoFuturaValidator(),
        ]),
        descripcion: new FormControl(data.descripcion, [
          Validators.required,
          this.espaciosValidator(),
        ]),
      });
    });
  }

  fechaNoFuturaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fechaSeleccionada = new Date(control.value);
      const hoy = new Date();
      if (fechaSeleccionada > hoy) {
        return { fechaFutura: true };
      }
      return null;
    };
  }

  espaciosValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const texto = control.value || '';
      return texto.trim().length === 0 ? { soloEspacios: true } : null;
    };
  }
}