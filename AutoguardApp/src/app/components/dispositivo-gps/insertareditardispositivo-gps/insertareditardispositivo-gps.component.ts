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
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Dispositivo_GPS } from '../../../models/dispositivo_GPS';
import { Vehiculo } from '../../../models/vehiculo';
import { DispositivoGPSService } from '../../../services/dispositivo-gps.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-insertareditardispositivo-gps',
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
  templateUrl: './insertareditardispositivo-gps.component.html',
  styleUrl: './insertareditardispositivo-gps.component.css',
})
export class InsertareditardispositivoGpsComponent {
  form: FormGroup = new FormGroup({});
  dispositivo_gps: Dispositivo_GPS = new Dispositivo_GPS();
  vehiculos: Vehiculo[] = [];

  id: number = 0;
  edicion: boolean = false;
  esCliente: boolean = false;

  constructor(
    private dS: DispositivoGPSService,
    private vehiculoService: VehiculoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
      this.esCliente = this.loginService.showRole() === 'CLIENTE';
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      numeroSerie: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{1,3}$/),
        ],
      ],
      precio: ['',[
          Validators.required,
          Validators.pattern(/^\d+(\.\d{1,2})?$/),
          Validators.min(0.01),
        ],],
      fechaAdquisicion: ['',[Validators.required, this.fechaNoFuturaValidator()],],
      placav: [null, Validators.required],
      });
    }

  fechaNoFuturaValidator() {
    return (control: FormControl) => {
      const valor = control.value;
      if (!valor) return null;

      const fechaSeleccionada = new Date(valor);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      return fechaSeleccionada > hoy ? { fechaFutura: true } : null;
    };
  }

  cargarVehiculosDisponibles(placaActual: string | null = null) {
    const username = this.loginService.getUsername();
    const esCliente = this.loginService.showRole() === 'CLIENTE';

    this.vehiculoService.list().subscribe((vehiculos) => {
      if (esCliente && username !== null) {
        vehiculos = vehiculos.filter((v) => v.usuario?.username === username);
      }

      this.dS.list().subscribe((gpsList) => {
        const placasUsadas = gpsList
          .filter((g) => g.vehiculo?.placa !== placaActual)
          .map((g) => g.vehiculo?.placa);

        this.vehiculos = vehiculos.filter(
          (v) => !placasUsadas.includes(v.placa)
        );
      });
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.dispositivo_gps.id = this.form.value.codigo;
      this.dispositivo_gps.numeroSerie =
        'GPS' + this.form.value.numeroSerie.padStart(3, '0');
      this.dispositivo_gps.precio = this.form.value.precio;
      this.dispositivo_gps.fechaAdquisicion = this.form.value.fechaAdquisicion;

      this.dispositivo_gps.vehiculo = new Vehiculo();
      this.dispositivo_gps.vehiculo.placa = this.form.value.placav;

      const accion = this.edicion
        ? this.dS.update(this.dispositivo_gps)
        : this.dS.insert(this.dispositivo_gps);

      accion.subscribe(() => {
        this.dS.list().subscribe((data) => this.dS.setList(data));
        this.router.navigate(['/dispositivo-gps/listardispositivogps']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/dispositivo-gps/listardispositivogps']);
  }

  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        const soloNumero = data.numeroSerie?.replace('GPS', '') || '';
        this.form = this.formBuilder.group({
          codigo: [data.id],
          numeroSerie: [
            soloNumero,
            [Validators.required, Validators.pattern(/^\d{1,3}$/)],
          ],
          precio: [data.precio, [Validators.required]],
          fechaAdquisicion: [data.fechaAdquisicion, [Validators.required]],
          placav: [data.vehiculo.placa, Validators.required],
        });

        this.cargarVehiculosDisponibles(data.vehiculo.placa);
      });
    } else {
      this.cargarVehiculosDisponibles();
    }
  }
}
