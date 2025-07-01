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
import { Dispositivo_GPS } from '../../../models/dispositivo_GPS';
//import { Router } from 'express';
import { ActivatedRoute, Params } from '@angular/router';
import { DispositivoGPSService } from '../../../services/dispositivo-gps.service';
import { Router } from '@angular/router';

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
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private dS: DispositivoGPSService,
    private formBuilder: FormBuilder,
    private router: Router  ,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
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

  aceptar() {
    if (this.form.valid) {
      this.dispositivo_gps.id = this.form.value.codigo;
      this.dispositivo_gps.numeroSerie = this.form.value.numeroSerie;
      this.dispositivo_gps.precio = this.form.value.precio;
      this.dispositivo_gps.fechaAdquisicion = this.form.value.fechaAdquisicion;
      this.dispositivo_gps.vehiculo.placa = this.form.value.placav;

      if (this.edicion) {
        this.dispositivo_gps.id = this.id;
        this.dS.update(this.dispositivo_gps).subscribe(() => {
          this.dS.list().subscribe((data) => this.dS.setList(data));
        });
        this.router.navigate(['/dispositivo-gps/listardispositivogps']);
      } else {
        this.dS.insert(this.dispositivo_gps).subscribe(() => {
          this.dS.list().subscribe((data) => this.dS.setList(data));
        });
        this.router.navigate(['/dispositivo-gps/listardispositivogps']);
      }
    }
  }

  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          numeroSerie: new FormControl(data.numeroSerie),
          precio: new FormControl(data.precio),
          fechaAdquisicion: new FormControl(data.fechaAdquisicion),
          placav: new FormControl(data.vehiculo.placa),
        });
      });
    }
  }
}
