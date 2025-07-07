import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Reclamo } from '../../../models/reclamo';
import { ReclamoService } from '../../../services/reclamo.service';
import { MatPaginator } from '@angular/material/paginator';
import { ReclamoResueltosDTO } from '../../../models/ReclamoResueltosDTO';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarreclamo',
  templateUrl: './listarreclamo.component.html',
  styleUrl: './listarreclamo.component.css',
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
})
export class ListarreclamoComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  esCliente: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private reclamoService: ReclamoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const username = this.loginService.getUsername();
    const rol = this.loginService.showRole()?.trim().toUpperCase();
    this.esCliente = rol === 'CLIENTE';

    this.reclamoService.list().subscribe((data: Reclamo[]) => {
      let lista = data;

      if (this.esCliente && username) {
        lista = lista.filter((r) => r.usuario?.username === username);
        this.displayedColumns = [
          'asunto',
          'fecha',
          'descripcion',
          'accion',
          'eliminar',
        ];
      } else {
        this.displayedColumns = [
          'id',
          'asunto',
          'fecha',
          'descripcion',
          'estado',
          'usuario',
          'accion',
          'eliminar',
        ];
      }

      this.dataSource = new MatTableDataSource(lista);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number): void {
    this.reclamoService.delete(id).subscribe(() => {
      this.ngOnInit();
    });
  }

  filtrarSinResolver(): void {
    if (this.esCliente) return;

    this.reclamoService
      .getReclamosSinResolver()
      .subscribe((data: ReclamoResueltosDTO[]) => {
        const adaptado = data.map((dto) => ({
          id: dto.id,
          asunto: dto.asunto,
          fecha: new Date(dto.fecha),
          descripcion: dto.descripcion,
          resuelto: dto.resuelto,
          usuario: dto.usuario,
        }));
        this.dataSource = new MatTableDataSource(adaptado);
        this.dataSource.paginator = this.paginator;
      });
  }

  listarTodos(): void {
    if (this.esCliente) return;

    this.reclamoService.list().subscribe((data: Reclamo[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  marcarComoResuelto(reclamo: Reclamo): void {
    const actualizado: Reclamo = {
      ...reclamo,
      resuelto: true,
    };

    this.reclamoService.update(actualizado).subscribe(() => {
      this.reclamoService.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

}
