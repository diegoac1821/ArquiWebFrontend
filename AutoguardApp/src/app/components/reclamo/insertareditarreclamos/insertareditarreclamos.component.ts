import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
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
export class InsertareditarreclamosComponent {
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
  this.esAdmin = roles.includes('ADMIN');

  if (username) {
    this.usuarioService.buscarPorUsername(username).subscribe((usuario) => {
      this.usuario = usuario;

      this.route.params.subscribe((data: Params) => {
        this.id = data['id'];

        // ✅ Validar correctamente si es edición
        this.edicion = this.id !== undefined && this.id !== null;

        if (this.edicion) {
          this.init(); // ← solo si se está editando
        } else {
          // ← inicializa formulario para insertar
          this.form = this.formBuilder.group({
            asunto: ['', Validators.required],
            fecha: ['', Validators.required],
            descripcion: ['', Validators.required],
          });
        }
      });
    });
  }
}


  aceptar() {
    if (this.form.valid) {
      this.reclamo.id = this.form.value.codigo;
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
        this.reclamo.resuelto = false; // por defecto al insertar
        this.rS.insert(this.reclamo).subscribe(() => {
          this.rS.list().subscribe((data) => this.rS.setList(data));
          this.router.navigate(['/reclamo/listarreclamo']);
        });
      }
    }
  }

  init() {
    this.rS.listId(this.id).subscribe((data) => {
      this.reclamo = data;

      this.form = this.formBuilder.group({
        asunto: new FormControl(data.asunto, Validators.required),
        fecha: new FormControl(data.fecha, Validators.required),
        descripcion: new FormControl(data.descripcion, Validators.required),
      });
    });
  }
}
