import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Ruta } from '../../../models/ruta';
import { RutaService } from '../../../services/ruta.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';




@Component({
  selector: 'app-listarruta',
  standalone: true,
  imports: [ MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
  MatPaginatorModule,
  MatSortModule
],
  templateUrl: './listarruta.component.html',
  styleUrls: ['./listarruta.component.css']
})
export class ListarrutaComponent implements OnInit {
  dataSource: MatTableDataSource<Ruta> = new MatTableDataSource<Ruta>();

  displayedColumns: string[] = [
    'id',
    'origenLatitud',
    'origenLongitud',
    'destinoLatitud',
    'destinoLongitud',
    'fecha',
    'duracion',
    'distancia',
    'placa',
    'editar',
    'eliminar',

  ];

  constructor(private rutaService: RutaService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

ngOnInit(): void {
    this.rutaService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rutaService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.rutaService.delete(id).subscribe(() => {
      this.rutaService.list().subscribe((data) => {
        this.rutaService.setList(data);
      });
    });
  }
}
