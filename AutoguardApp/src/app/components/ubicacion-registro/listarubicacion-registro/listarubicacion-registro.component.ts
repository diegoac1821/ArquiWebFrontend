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

@Component({
  selector: 'app-listarubicacionregistro',
  standalone: true,
  imports: [  MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './listarubicacion-registro.component.html',
  styleUrls: ['./listarubicacion-registro.component.css']
})
export class ListarubicacionregistroComponent implements OnInit {
   dataSource: MatTableDataSource<ubicacion_registro> = new MatTableDataSource<ubicacion_registro>();

  displayedColumns: string[] = ['id', 'latitud', 'longitud', 'fecha', 'hora', 'gps','editar','eliminar'];

  constructor(private ubicacionService: UbicacionRegistroService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

 ngOnInit(): void {
    this.ubicacionService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.ubicacionService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.ubicacionService.delete(id).subscribe(() => {
      this.ubicacionService.list().subscribe((data) => {
        this.ubicacionService.setList(data);
      });
    });
  }
}
