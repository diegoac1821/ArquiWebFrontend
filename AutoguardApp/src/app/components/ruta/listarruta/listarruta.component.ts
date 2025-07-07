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
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarruta',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './listarruta.component.html',
  styleUrls: ['./listarruta.component.css'],
})
export class ListarrutaComponent implements OnInit {
  dataSource: MatTableDataSource<Ruta> = new MatTableDataSource<Ruta>();
  esCliente: boolean = false;

  displayedColumns: string[] = [];

  constructor(
    private rutaService: RutaService,
    private loginService: LoginService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
  const username = this.loginService.getUsername();
  const rol = this.loginService.showRole()?.trim().toUpperCase(); 
  this.esCliente = rol === 'CLIENTE';

  console.log('Rol actual normalizado:', rol);

  this.rutaService.list().subscribe((data) => {
    let rutas = data;

    if (this.esCliente && username !== null) {
      rutas = rutas.filter((r) => r.vehiculo?.usuario?.username === username);
    }

    this.displayedColumns = this.esCliente
      ? [
          'id',
          'fecha',
          'duracion',
          'distancia',
          'placa',
          'verRuta',
          'eliminar',
        ]
      : [
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

    this.dataSource = new MatTableDataSource(rutas);
    this.dataSource.paginator = this.paginator;
  });
}


  eliminar(id: number) {
    this.rutaService.delete(id).subscribe(() => {
      this.rutaService.list().subscribe((data) => {
        this.dataSource.data = this.esCliente
          ? data.filter(
              (r) =>
                r.vehiculo?.usuario?.username ===
                this.loginService.getUsername()
            )
          : data;
      });
    });
  }
}
