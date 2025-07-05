import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UbicacionRegistroService } from '../../../services/ubicacion-registro.service';
import { ubicacion_registro } from '../../../models/ubicacion_registro';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

declare var google: any;

@Component({
  selector: 'app-verubicacion',
  templateUrl: './verubicacion.component.html',
  styleUrls: ['./verubicacion.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule
  ]
})
export class VerUbicacionComponent implements OnInit {
  ubicacion!: ubicacion_registro;

  constructor(
    private route: ActivatedRoute,
    private ubicacionService: UbicacionRegistroService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.ubicacionService.listId(id).subscribe((data) => {
      this.ubicacion = data;
      this.initMap();
    });
  }

  initMap(): void {
    const position = {
      lat: parseFloat(this.ubicacion.latitud),
      lng: parseFloat(this.ubicacion.longitud),
    };

    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 17,
        center: position,
      }
    );

    new google.maps.Marker({
      position,
      map,
      title: 'Ubicación registrada',
    });
  }
}
