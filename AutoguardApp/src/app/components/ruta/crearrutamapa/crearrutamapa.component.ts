import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Vehiculo } from '../../../models/vehiculo';
import { Ruta } from '../../../models/ruta';
import { VehiculoService } from '../../../services/vehiculo.service';
import { RutaService } from '../../../services/ruta.service';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
declare var google: any;

@Component({
  selector: 'app-crearrutamapa',
  templateUrl: './crearrutamapa.component.html',
  styleUrls: ['./crearrutamapa.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
  ],
})
export class CrearrutamapaComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  vehiculoSeleccionado!: Vehiculo;

  map: any;
  origen: { lat: number; lng: number } | null = null;
  destino: { lat: number; lng: number } | null = null;
  directionsRenderer: any;

  distancia: number = 0;
  duracion: string = '';
  guardando: boolean = false;

  constructor(
    private vehiculoService: VehiculoService,
    private rutaService: RutaService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
  const username = this.loginService.getUsername();
  const esCliente = this.loginService.showRole() === 'CLIENTE';

  this.vehiculoService.list().subscribe((data) => {
    if (esCliente && username !== null) {
      this.vehiculos = data.filter(v => v.usuario?.username === username);
    } else {
      this.vehiculos = data;
    }
  });
}


  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const mapElement = document.getElementById('map') as HTMLElement;

      this.map = new google.maps.Map(mapElement, {
        center: { lat: -12.0464, lng: -77.0428 },
        zoom: 13,
      });

      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(this.map);

      this.map.addListener('click', (e: any) => {
        const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };

        if (!this.origen) {
          this.origen = latLng;
          new google.maps.Marker({
            position: latLng,
            map: this.map,
            label: 'A',
          });
        } else if (!this.destino) {
          this.destino = latLng;
          new google.maps.Marker({
            position: latLng,
            map: this.map,
            label: 'B',
          });
          this.trazarRuta();
        }
      });
    }
  }

  trazarRuta(): void {
    if (!this.origen || !this.destino) return;

    const directionsService = new google.maps.DirectionsService();
    const request = {
      origin: this.origen,
      destination: this.destino,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result: any, status: string) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(result);
        const leg = result.routes[0].legs[0];
        this.distancia = leg.distance.value / 1000; 
        this.duracion = leg.duration.text;
      } else {
        console.error('Error al trazar ruta:', status);
      }
    });
  }

 guardarRuta(): void {
  if (!this.origen || !this.destino || !this.vehiculoSeleccionado) {
    alert('Faltan datos obligatorios: origen, destino o vehículo.');
    return;
  }

  this.guardando = true;

  const nuevaRuta = new Ruta();
  nuevaRuta.origenLatitud = this.origen.lat.toString();
  nuevaRuta.origenLongitud = this.origen.lng.toString();
  nuevaRuta.destinoLatitud = this.destino.lat.toString();
  nuevaRuta.destinoLongitud = this.destino.lng.toString();
  nuevaRuta.distancia = Math.round(this.distancia);

  const minutos = parseInt(this.duracion);
  nuevaRuta.duracion = `00:${minutos.toString().padStart(2, '0')}:00`;

  nuevaRuta.fecha = new Date();
  nuevaRuta.vehiculo = this.vehiculoSeleccionado;

  this.rutaService.insert(nuevaRuta).subscribe({
    next: () => {
      alert('✅ Ruta registrada con éxito');
      this.router.navigate(['/ruta/listarruta']);
    },
    error: (err) => {
      console.error('Error al guardar la ruta:', err);
      alert('Error al guardar la ruta');
      this.guardando = false;
    },
  });
}

cancelar(): void {
  this.router.navigate(['/ruta/listarruta']);
}

}
