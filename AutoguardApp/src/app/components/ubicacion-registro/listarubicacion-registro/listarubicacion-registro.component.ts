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
   paginatedLocations: any[] = []; // Lista de ubicaciones paginadas
  currentPage: number = 0;
  pageSize: number = 3;
  totalLocations: number = 0;

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
          this.updatePaginatedLocations();
      });
  }
    // Actualizar las ubicaciones visibles según la página actual
   updatePaginatedLocations() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedLocations = this.locations.slice(startIndex, endIndex);
  }

    // Cambiar de página
  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedLocations();
  }

eliminar(id: number) {
  this.ubicacionService.delete(id).subscribe(() => {
    // Filtra y elimina la ubicación de la tabla sin hacer una nueva consulta
    this.dataSource.data = this.dataSource.data.filter((location) => location.id !== id);
    
    // Actualiza la lista de ubicaciones filtradas y mapea los datos
    this.locations = this.dataSource.data
      .filter((location) => {
        const lat = parseFloat(location.latitud);
        const lng = parseFloat(location.longitud);
        return !isNaN(lat) && !isNaN(lng);
      })
      .map((location) => ({
        lat: parseFloat(location.latitud),
        lng: parseFloat(location.longitud),
        id: location.id,
        fecha: location.fecha,
        hora: location.hora,
        gps: location.disGPS?.numeroSerie,
      }));

    // Actualiza la paginación para reflejar el cambio
    this.updatePaginatedLocations();

    // Si estamos en una página con menos elementos, aseguramos que se vaya a la primera página
    if (this.paginatedLocations.length === 0 && this.currentPage > 0) {
      this.paginator.firstPage(); // Ve a la primera página si la actual está vacía
    }
  });
}

}

