import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VehiculoService } from '../../../services/vehiculo.service';
import { Vehiculo } from '../../../models/vehiculo';
import { Usuario } from '../../../models/usuario';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../../services/usuario.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-insertareditarvehiculo',
  standalone: true,
  templateUrl: './insertareditarvehiculo.component.html',
  styleUrl: './insertareditarvehiculo.component.css',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
})
export class InsertareditarvehiculoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  vehiculo: Vehiculo = new Vehiculo();

  placa: string = '';
  edicion: boolean = false;
  rol: string = '';

  constructor(
    private vS: VehiculoService,
    private uS: UsuarioService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.rol = this.loginService.showRole() ?? '';

    this.route.params.subscribe((data: Params) => {
      this.placa = data['placa'];
      this.edicion = this.placa != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      placa: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z]{3}-\d{3}$/)],
      ],
      color: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      usuarioId: [null, Validators.required],
    });

    if (!this.edicion && this.rol === 'CLIENTE') {
      const username = this.loginService.getUsername();
      if (username) {
        this.uS.buscarPorUsername(username).subscribe((usuario) => {
          this.form.get('usuarioId')?.setValue(usuario.id);
        });
      }
    }
  }

  aceptar() {
    if (this.form.valid) {
      this.vehiculo.placa = this.form.value.placa;
      this.vehiculo.color = this.form.value.color;
      this.vehiculo.marca = this.form.value.marca;
      this.vehiculo.modelo = this.form.value.modelo;
      this.vehiculo.usuario = new Usuario();
      this.vehiculo.usuario.id = this.form.value.usuarioId;

      if (this.edicion) {
        this.vS.update(this.vehiculo).subscribe(() => {
          this.vS.list().subscribe((data) => this.vS.setList(data));
          this.router.navigate(['/vehiculo/listarvehiculo']);
        });
      } else {
        this.vS.insert(this.vehiculo).subscribe(() => {
          this.vS.list().subscribe((data) => this.vS.setList(data));
          this.router.navigate(['/vehiculo/listarvehiculo']);
        });
      }
    }
  }

  cancelar() {
    this.router.navigate(['/vehiculo/listarvehiculo']);
  }

  init() {
  if (this.edicion) {
    this.vS.listId(this.placa).subscribe((data) => {
      this.form = this.formBuilder.group({
        placa: [
          data.placa,
          [Validators.required, Validators.pattern(/^[A-Z]{3}-\d{3}$/)],
        ],
        color: [data.color, Validators.required],
        marca: [data.marca, Validators.required],
        modelo: [data.modelo, Validators.required],
        usuarioId: [data.usuario.id, Validators.required],
      });
    });
  }
}

  esAdmin(): boolean {
    return this.rol === 'ADMIN';
  }
}
