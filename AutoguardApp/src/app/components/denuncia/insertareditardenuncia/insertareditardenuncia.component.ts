import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Denuncia } from '../../../models/denuncia';
import { DenunciaService } from '../../../services/denuncia.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Comisaria } from '../../../models/comisaria';
import { Vehiculo } from '../../../models/vehiculo';
import { VehiculoService } from '../../../services/vehiculo.service';
import { ComisariaService } from '../../../services/comisaria.service';
import { MatSelectModule } from '@angular/material/select';
import { LoginService } from '../../../services/login.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
@Component({
  selector: 'app-insertareditardenuncia',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: './insertareditardenuncia.component.html',
  styleUrl: './insertareditardenuncia.component.css',
})
export class InsertareditardenunciaComponent {
  form: FormGroup = new FormGroup({});
  denuncia: Denuncia = new Denuncia();
  id: number = 0;
  edicion: boolean = false;
  comisarias: Comisaria[] = [];
  vehiculos: Vehiculo[] = [];

  estado: { value: string; viewValue: string }[] = [
    { value: 'Abierto', viewValue: 'Abierto' },
    { value: 'Cerrado', viewValue: 'Cerrado' },
  ];

  constructor(
    private dS: DenunciaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private comisariaService: ComisariaService,
    private vehiculoService: VehiculoService,
    private loginService: LoginService,
    private usuarioService: UsuarioService
  ) {}

  get isAdmin(): boolean {
    return this.loginService.showRole() === 'ADMIN';
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      descripcion: ['', Validators.required],
      motivo: ['', Validators.required],
      comisariaId: [null, Validators.required],
      vehiculoId: new FormControl(
        { value: null, disabled: !this.isAdmin },
        Validators.required
      ),
      ...(this.isAdmin && {
        estado: ['', Validators.required],
      }),
    });

    this.listarComisarias();
    this.listarVehiculos();
  }

  listarComisarias() {
    this.comisariaService.list().subscribe((data) => {
      this.comisarias = data;
    });
  }

  listarVehiculos() {
    if (this.isAdmin) {
      this.vehiculoService.list().subscribe((data) => {
        this.vehiculos = data;
      });
    } else {
      const username = this.loginService.getUsername();
      if (username) {
        this.usuarioService.buscarPorUsername(username).subscribe((usuario) => {
          this.vehiculoService.list().subscribe((vehiculos) => {
            const vehiculosCliente = vehiculos.filter(
              (v) => v.usuario?.id === usuario.id
            );
            this.vehiculos = vehiculosCliente;

            if (vehiculosCliente.length === 1) {
              this.form.patchValue({ vehiculoId: vehiculosCliente[0].placa });
            } else if (vehiculosCliente.length > 1) {
              this.form.get('vehiculoId')?.enable();
            }
          });
        });
      }
    }
  }

    cancelar() {
    this.router.navigate(['/alerta/listaralerta']);
  }

  aceptar() {
    if (this.form.valid) {
      this.denuncia.descripcion = this.form.value.descripcion;
      this.denuncia.motivo = this.form.value.motivo;
      this.denuncia.comisaria = new Comisaria();
      this.denuncia.comisaria.id = this.form.value.comisariaId;
      this.denuncia.vehiculo = new Vehiculo();
      this.denuncia.vehiculo.placa = this.form.value.vehiculoId;

      this.denuncia.estado = this.isAdmin ? this.form.value.estado : 'Abierto';

      if (this.edicion) {
        this.denuncia.id = this.id;
        this.dS.update(this.denuncia).subscribe(() => {
          this.dS.list().subscribe((data) => this.dS.setList(data));
          this.router.navigate(['/denuncia/listardenuncia']);
        });
      } else {
        this.dS.insert(this.denuncia).subscribe(() => {
          this.dS.list().subscribe((data) => this.dS.setList(data));
          this.router.navigate(['/denuncia/listardenuncia']);
        });
      }
    }
  }

  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          descripcion: data.descripcion,
          motivo: data.motivo,
          estado: data.estado,
          comisariaId: data.comisaria.id,
          vehiculoId: data.vehiculo.placa,
        });
      });
    }
  }
}
