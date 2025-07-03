import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-insertareditardispositivo-gps',
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

  constructor(
    private dS: DispositivoGPSService,
    private vehiculoService: VehiculoService,
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
      codigo: [''],
      numeroSerie: ['', Validators.required],
      precio: ['', Validators.required],
      fechaAdquisicion: ['', Validators.required],
      placav: [null, Validators.required],
    });
  }

  // ✅ Lógica de carga de vehículos, con excepción para edición
  cargarVehiculosDisponibles(placaActual: string | null = null) {
    this.vehiculoService.list().subscribe(vehiculos => {
      this.dS.list().subscribe(gpsList => {
        const placasUsadas = gpsList
          .filter(g => g.vehiculo?.placa !== placaActual) // filtra todas excepto la actual si está editando
          .map(g => g.vehiculo?.placa);

        // Muestra solo las placas que no están ya asignadas
        this.vehiculos = vehiculos.filter(v => !placasUsadas.includes(v.placa));
      });
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.dispositivo_gps.id = this.form.value.codigo;
      this.dispositivo_gps.numeroSerie = this.form.value.numeroSerie;
      this.dispositivo_gps.precio = this.form.value.precio;
      this.dispositivo_gps.fechaAdquisicion = this.form.value.fechaAdquisicion;

      this.dispositivo_gps.vehiculo = new Vehiculo();
      this.dispositivo_gps.vehiculo.placa = this.form.value.placav;

      const accion = this.edicion
        ? this.dS.update(this.dispositivo_gps)
        : this.dS.insert(this.dispositivo_gps);

      accion.subscribe(() => {
        this.dS.list().subscribe(data => this.dS.setList(data));
        this.router.navigate(['/dispositivo-gps/listardispositivogps']);
      });
    }
  }

  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          codigo: [data.id],
          numeroSerie: [data.numeroSerie],
          precio: [data.precio],
          fechaAdquisicion: [data.fechaAdquisicion],
          placav: [data.vehiculo.placa],
        });

        // ✅ Cargar vehículos pero dejando disponible la placa actual
        this.cargarVehiculosDisponibles(data.vehiculo.placa);
      });
    } else {
      // ✅ Crear: cargar solo placas sin GPS
      this.cargarVehiculosDisponibles();
    }
  }
}
