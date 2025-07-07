import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RutaService } from '../../../services/ruta.service';
import { Ruta } from '../../../models/ruta';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
declare var google: any;

@Component({
  selector: 'app-vermaparuta',
  templateUrl: './vermaparuta.component.html',
  styleUrls: ['./vermaparuta.component.css'],
  imports: [
  CommonModule,
  RouterLink,
  MatButtonModule,
]
})
export class VerMapaRutaComponent implements OnInit {
  ruta!: Ruta;

  constructor(
    private route: ActivatedRoute,
    private rutaService: RutaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.rutaService.listId(id).subscribe(data => {
      this.ruta = data;
      this.initMap();
    });
  }

  initMap(): void {
    const origen = {
      lat: parseFloat(this.ruta.origenLatitud),
      lng: parseFloat(this.ruta.origenLongitud),
    };
    const destino = {
      lat: parseFloat(this.ruta.destinoLatitud),
      lng: parseFloat(this.ruta.destinoLongitud),
    };

    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 13,
      center: origen,
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    directionsService.route(
      {
        origin: origen,
        destination: destino,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result: any, status: string) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
        } else {
          alert('No se pudo mostrar la ruta en el mapa');
        }
      }
    );
  }
}
