import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ubicacion_registro } from '../../../models/ubicacion_registro';
import { UbicacionRegistroService } from '../../../services/ubicacion-registro.service';
import { Dispositivo_GPS } from '../../../models/dispositivo_GPS';
import { DispositivoGPSService } from '../../../services/dispositivo-gps.service';

@Component({
  selector: 'app-insertareditarubicacion',
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
  templateUrl: './insertareditarubicacion.component.html',
  styleUrl: './insertareditarubicacion.component.css',
})
export class InsertareditarubicacionComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  ubicacion: ubicacion_registro = new ubicacion_registro();
  listaGps: Dispositivo_GPS[] = [];//aqui
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private ubicacionService: UbicacionRegistroService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gpsService: DispositivoGPSService,//aqui
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.gpsService.list().subscribe((data) => {
    this.listaGps = data;
  });//aqui

    this.form = this.formBuilder.group({
      id: [''],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      dgpsId: [null, Validators.required],//aqui
    });
  }

  aceptar() {
    if (this.form.valid) {
      const gps = new Dispositivo_GPS();
    gps.id = this.form.value.dgpsId;
      
      this.ubicacion.id = this.form.value.id;
      this.ubicacion.latitud = this.form.value.latitud;
      this.ubicacion.longitud = this.form.value.longitud;
      this.ubicacion.fecha = this.form.value.fecha;
      this.ubicacion.hora = this.form.value.hora;
      this.ubicacion.disGPS = new Dispositivo_GPS();
      this.ubicacion.disGPS.id = this.form.value.dgpsId;

      if (this.edicion) {
        this.ubicacion.id = this.id;
        this.ubicacionService.update(this.ubicacion).subscribe(() => {
          this.ubicacionService
            .list()
            .subscribe((data) => this.ubicacionService.setList(data));
          this.router.navigate(['/ubicacion-registro/listarubicacionregistro']);
        });
      } else {
        this.ubicacionService.insert(this.ubicacion).subscribe(() => {
          this.ubicacionService
            .list()
            .subscribe((data) => this.ubicacionService.setList(data));
          this.router.navigate(['/ubicacion-registro/listarubicacionregistro']);
        });
      }
    }
  }

  init() {
    if (this.edicion) {
      this.ubicacionService.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id, Validators.required),
          latitud: new FormControl(data.latitud, Validators.required),
          longitud: new FormControl(data.longitud, Validators.required),
          fecha: new FormControl(data.fecha, Validators.required),
          hora: new FormControl(data.hora, Validators.required),
          dgpsId: new FormControl(data.disGPS.id, Validators.required),
        });
      });
    }
  }
}
