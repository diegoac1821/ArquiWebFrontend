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
import { LoginService } from '../../../services/login.service';
import { RouterLink } from '@angular/router';

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
    RouterLink
  ],
  templateUrl: './insertareditarubicacion.component.html',
  styleUrl: './insertareditarubicacion.component.css',
})
export class InsertareditarubicacionComponent implements OnInit {
  mensajeExito: boolean = false;
  form: FormGroup = new FormGroup({});
  ubicacion: ubicacion_registro = new ubicacion_registro();
  listaGps: Dispositivo_GPS[] = [];
  id: number = 0;
  edicion: boolean = false;
  esCliente: boolean = false;
  constructor(
    private ubicacionService: UbicacionRegistroService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gpsService: DispositivoGPSService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.esCliente = this.loginService.showRole() === 'CLIENTE';

    this.gpsService.list().subscribe((data) => {
      this.listaGps = data;
    });

    this.form = this.formBuilder.group({
      id: [''],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      dgpsId: [null, Validators.required],
    });
  }

 aceptar() {
    if (this.form.valid) {
      const gps = new Dispositivo_GPS();
      gps.id = this.form.value.dgpsId;
      this.mensajeExito = true; 
      
      this.ubicacion.id = this.form.value.id;
      this.ubicacion.latitud = this.form.value.latitud;
      this.ubicacion.longitud = this.form.value.longitud;
      this.ubicacion.fecha = this.form.value.fecha;
      this.ubicacion.hora = this.form.value.hora;
      this.ubicacion.disGPS = gps;

      if (this.edicion) {
        this.ubicacionService.update(this.ubicacion).subscribe(() => {
          this.ubicacionService
            .list()
            .subscribe((data) => this.ubicacionService.setList(data));
          this.router.navigate(['/ubicacion-registro/listarubicacionregistro']);
          this.limpiarMensajeExito();  
        });
      } else {
        this.ubicacionService.insert(this.ubicacion).subscribe(() => {
          this.ubicacionService
            .list()
            .subscribe((data) => this.ubicacionService.setList(data));
          this.router.navigate(['/ubicacion-registro/listarubicacionregistro']);
          this.limpiarMensajeExito();  
        });
      }
    }
  }

  limpiarMensajeExito() {
    setTimeout(() => {
      this.mensajeExito = false;
    }, 3000); 
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
