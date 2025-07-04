import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ubicacion_registro } from '../../../models/ubicacion_registro';
import { UbicacionRegistroService } from '../../../services/ubicacion-registro.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LoginService } from '../../../services/login.service';
import { MatCardModule } from '@angular/material/card'; // Importa el módulo MatCardModule
import { GoogleMapsModule } from '@angular/google-maps';  // Importar GoogleMapsModule

@Component({
  selector: 'app-listarubicacionregistro',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    GoogleMapsModule
  ],
  templateUrl: './listarubicacion-registro.component.html',
  styleUrls: ['./listarubicacion-registro.component.css'],
})
export class ListarubicacionregistroComponent implements OnInit {

   dataSource: MatTableDataSource<ubicacion_registro> = new MatTableDataSource<ubicacion_registro>(); 

  displayedColumns: string[] = [
    'id',
    'latitud',
    'longitud',
    'fecha',
    'hora',
    'gps',
    'editar',
    'eliminar',
  ];

  esCliente: boolean = false;
  locations: any[] = []; // Declarar la variable locations como un array vacío

  constructor(
    private ubicacionService: UbicacionRegistroService,
    private loginService: LoginService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    const username = this.loginService.getUsername();
  const rol = this.loginService.showRole()?.trim().toUpperCase();
  this.esCliente = rol === 'CLIENTE';

  this.ubicacionService.list().subscribe((data) => {
    let lista = data;

    if (this.esCliente && username !== null) {
      lista = lista.filter(
        (u) => u.disGPS?.vehiculo?.usuario?.username === username
      );
    }

    this.displayedColumns = this.esCliente
      ? ['fecha', 'hora', 'gps', 'ver', 'eliminar']
      : [
          'id',
          'latitud',
          'longitud',
          'fecha',
          'hora',
          'gps',
          'editar',
          'eliminar',
        ];

    this.dataSource = new MatTableDataSource(lista);
    this.dataSource.paginator = this.paginator;

    // Asegúrate de convertir latitud y longitud a números
    this.locations = lista
     .filter((location) => {
    const lat = parseFloat(location.latitud); // Convertir a número
    const lng = parseFloat(location.longitud); // Convertir a número
    return !isNaN(lat) && !isNaN(lng); // Filtrar solo si son números válidos
  })
    .map((location) => ({
      lat: parseFloat(location.latitud), // Convertir a número
      lng: parseFloat(location.longitud), // Convertir a número
      id: location.id,
      fecha: location.fecha,  // Añadir fecha
      hora: location.hora,    // Añadir hora
      gps: location.disGPS?.numeroSerie, // Añadir GPS
    }));
    });
  }

  eliminar(id: number) {
    this.ubicacionService.delete(id).subscribe(() => {
      this.ubicacionService.list().subscribe((data) => {
        this.dataSource.data = data; // ← recarga los datos directamente en la tabla
      });
    });
  }
}
