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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

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
    MatFormFieldModule, //PARA EL FILTRO
    MatInputModule,
    FormsModule,
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

  //FILTRO
  filtro: string = '';


  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit(): void {
    this.vehiculoService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);

      // FILTRA VEHICULO POR PLACA
      this.dataSource.filterPredicate = (vehiculo: Vehiculo, filter: string) => {
        return vehiculo.placa
          .toLowerCase()
          .includes(filter.trim().toLowerCase());
      };
      this.dataSource.paginator = this.paginator;
    });
    this.vehiculoService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(placa: string) {
    this.vehiculoService.delete(placa).subscribe(() => {
      this.vehiculoService.list().subscribe((data) => {
        this.vehiculoService.setList(data);
      });
    });
  }

  //FUNCION PARA FILTRO
  aplicarfiltro() {
    this.dataSource.filter = this.filtro.trim().toLowerCase();
  }
}
