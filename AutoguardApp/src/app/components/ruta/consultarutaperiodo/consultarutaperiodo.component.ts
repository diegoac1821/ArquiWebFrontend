import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RutaService } from '../../../services/ruta.service';
import { RutasperiodoplacaDTO } from '../../../models/RutasperiodoplacaDTO';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-consultarutaperiodo',
  templateUrl: './consultarutaperiodo.component.html',
  styleUrls: ['./consultarutaperiodo.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    FormsModule
  ]
})
export class ConsultarutaperiodoComponent {
  fecha1!: Date;
  fecha2!: Date;
  placa: string = '';
  dataSource!: MatTableDataSource<RutasperiodoplacaDTO>;
  displayedColumns: string[] = ['id', 'fecha', 'placa', 'distancia', 'duracion'];

  constructor(private rutaService: RutaService,  private router: Router) {}

  consultarRutas(): void {
    const params = {
      fecha1: this.fecha1.toISOString().split('T')[0],
      fecha2: this.fecha2.toISOString().split('T')[0],
      placa: this.placa
    };

    this.rutaService.getRutasPeriodoPlaca(params).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      if (data.length > 0) {
        this.mostrarRutaEnMapa(data[0]); 
      } else {
        const mapDiv = document.getElementById('map');
        if (mapDiv) mapDiv.innerHTML = ''; 
      }
    });
  }

  cancelar(): void {
  this.router.navigate(['/ruta/listarruta']); 
}
  

  mostrarRutaEnMapa(ruta: RutasperiodoplacaDTO): void {
    const origen = {
      lat: parseFloat(ruta.origenLatitud),
      lng: parseFloat(ruta.origenLongitud)
    };
    const destino = {
      lat: parseFloat(ruta.destinoLatitud),
      lng: parseFloat(ruta.destinoLongitud)
    };

    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 13,
      center: origen
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
