import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Dispositivo_GPS } from '../../../models/dispositivo_GPS';
import { DispositivoGPSService } from '../../../services/dispositivo-gps.service';
import { UbicacionRegistroService } from '../../../services/ubicacion-registro.service';
import { ubicacion_registro } from '../../../models/ubicacion_registro';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { Router } from '@angular/router'; 
import { LoginService } from '../../../services/login.service';
declare const google: any;

@Component({
  selector: 'app-insertarubicacion',
  templateUrl: './insertarubicacion.component.html',
  styleUrls: ['./insertarubicacion.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule
  ],
})
export class InsertarUbicacionComponent implements OnInit, AfterViewInit {

  ubicacion: ubicacion_registro = new ubicacion_registro();
  dispositivos: Dispositivo_GPS[] = [];
  gpsSeleccionado!: Dispositivo_GPS;

  constructor(
    private gpsService: DispositivoGPSService,
    private ubicacionService: UbicacionRegistroService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
  const username = this.loginService.getUsername();
  const esCliente = this.loginService.showRole() === 'CLIENTE';

  this.gpsService.list().subscribe(data => {
    let lista = data;

    if (esCliente && username !== null) {
      lista = data.filter(gps =>
        gps.vehiculo?.usuario?.username === username
      );
    }

    this.dispositivos = lista;
  });
}
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: -12.0453, lng: -77.0311 },
        zoom: 15,
      });

      map.addListener("click", (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          this.ubicacion.latitud = event.latLng.lat().toString();
          this.ubicacion.longitud = event.latLng.lng().toString();

          new google.maps.Marker({
            position: event.latLng,
            map: map
          });
        }
      });
    }
  }

  guardarUbicacion(): void {
    if (!this.gpsSeleccionado || !this.ubicacion.latitud || !this.ubicacion.longitud) {
      alert("Selecciona un GPS y marca la ubicación en el mapa");
      return;
    }

    const ahora = new Date();
    this.ubicacion.fecha = ahora;
    this.ubicacion.hora = ahora.toTimeString().split(' ')[0]; 
    this.ubicacion.disGPS = this.gpsSeleccionado;

    this.ubicacionService.insert(this.ubicacion).subscribe({
      next: () => {
        alert("✅ Ubicación registrada correctamente");
        this.router.navigate(['/ubicacion-registro/listarubicacionregistro']); 
      },
      error: () => alert("Error al registrar ubicación"),
    });
  }
  cancelar(): void {
    this.router.navigate(['/ubicacion-registro/listarubicacionregistro']);
  }
}
