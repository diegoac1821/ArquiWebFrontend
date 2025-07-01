import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { VehiculoService } from '../../../services/vehiculo.service';
import { Vehiculo } from '../../../models/vehiculo';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarvehiculo',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    MatPaginatorModule,
  ],
  templateUrl: './listarvehiculo.component.html',
  styleUrls: ['./listarvehiculo.component.css'],
})
export class ListarvehiculoComponent implements OnInit {
  dataSource: MatTableDataSource<Vehiculo> = new MatTableDataSource<Vehiculo>();

  displayedColumns: string[] = [
    'placa',
    'color',
    'marca',
    'modelo',
    'usuario',
    'editar',
    'eliminar',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit(): void {
    this.vehiculoService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.vehiculoService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(placa: string) {
    this.vehiculoService.delete(placa).subscribe(() => {
      this.vehiculoService.list().subscribe(data => {
        this.vehiculoService.setList(data);
      });
    });
  }
}
