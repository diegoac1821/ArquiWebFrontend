import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Dispositivo_GPS } from '../../../models/dispositivo_GPS';
import { DispositivoGPSService } from '../../../services/dispositivo-gps.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listardispositivo-gps',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    RouterLink, 
  ],
  templateUrl: './listardispositivo-gps.component.html',
  styleUrl: './listardispositivo-gps.component.css'
})
export class ListardispositivoGPSComponent implements OnInit{
  dataSource: MatTableDataSource<Dispositivo_GPS> = new MatTableDataSource<Dispositivo_GPS>();

  displayedColumns: string[] = [
    'id',
    'numeroSerie',
    'precio',
    'fechaAdquisicion',
    'vehiculo',
    'editar',
    'eliminar',
  ];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dispositivo_gpsService: DispositivoGPSService) {}

  ngOnInit(): void {
    this.dispositivo_gpsService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; // asignación aquí también por si acaso
     
    });
    this.dispositivo_gpsService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; // asignación aquí también por si acaso
    });
  }

  eliminar(id: number) {
    this.dispositivo_gpsService.delete(id).subscribe(() => {
      this.dispositivo_gpsService.list().subscribe((data) => {
        this.dispositivo_gpsService.setList(data);
      });
    });
  }
}


