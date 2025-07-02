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
import { LoginService } from '../../../services/login.service';
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

  constructor(
    private vehiculoService: VehiculoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const username = this.loginService.getUsername();
    const esCliente = this.loginService.showRole() === 'CLIENTE';

    this.vehiculoService.list().subscribe((data) => {
      let vehiculos = data;

      if (esCliente && username !== null) {
        vehiculos = vehiculos.filter((v) => v.usuario?.username === username);
      }

      this.dataSource = new MatTableDataSource(vehiculos);
      this.dataSource.paginator = this.paginator;

      this.dataSource.filterPredicate = (
        vehiculo: Vehiculo,
        filter: string
      ) => {
        return vehiculo.placa
          .toLowerCase()
          .includes(filter.trim().toLowerCase());
      };
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
