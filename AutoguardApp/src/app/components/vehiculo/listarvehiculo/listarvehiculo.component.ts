import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../../services/vehiculo.service';
import { Vehiculo } from '../../../models/vehiculo';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listarvehiculo',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
  ],
  templateUrl: './listarvehiculo.component.html',
  styleUrls: ['./listarvehiculo.component.css'],
})
export class ListarvehiculoComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  vehiculosFiltrados: Vehiculo[] = [];
  vehiculosPaginados: Vehiculo[] = [];

  filtro: string = '';
  pageSize = 4;
  pageIndex = 0;
  totalItems = 0;

  constructor(
    private vehiculoService: VehiculoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const username = this.loginService.getUsername();
    const esCliente = this.loginService.showRole() === 'CLIENTE';

    this.vehiculoService.list().subscribe((data) => {
      let lista = data;
      if (esCliente && username !== null) {
        lista = lista.filter((v) => v.usuario?.username === username);
      }

      this.vehiculos = lista;
      this.aplicarfiltro();
    });
  }

  aplicarfiltro() {
    const filtroLower = this.filtro.trim().toLowerCase();
    this.vehiculosFiltrados = this.vehiculos.filter((v) =>
      v.placa.toLowerCase().includes(filtroLower)
    );
    this.totalItems = this.vehiculosFiltrados.length;
    this.pageIndex = 0;
    this.actualizarPaginacion();
  }

  actualizarPaginacion() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.vehiculosPaginados = this.vehiculosFiltrados.slice(start, end);
  }

  cambiarPagina(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.actualizarPaginacion();
  }

  eliminar(placa: string) {
  this.vehiculoService.delete(placa).subscribe(() => {
    const username = this.loginService.getUsername();
    const esCliente = this.loginService.showRole() === 'CLIENTE';

    this.vehiculoService.list().subscribe((data) => {
      let lista = data;
      if (esCliente && username !== null) {
        lista = lista.filter((v) => v.usuario?.username === username);
      }

      this.vehiculos = lista;
      this.aplicarfiltro(); 
    });
  });
}
}
