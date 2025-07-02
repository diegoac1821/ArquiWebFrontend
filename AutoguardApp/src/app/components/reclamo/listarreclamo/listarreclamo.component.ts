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
  dataSource = new MatTableDataSource<any>(); // tipo flexible
  displayedColumns: string[] = [
    'id',
    'asunto',
    'fecha',
    'descripcion',
    'estado',
    'usuario',
    'editar',
    'eliminar',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private reclamoService: ReclamoService) {}

  ngOnInit(): void {
    this.reclamoService.list().subscribe((data: Reclamo[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number): void {
    this.reclamoService.delete(id).subscribe(() => {
      this.reclamoService.list().subscribe((data: Reclamo[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  filtrarSinResolver(): void {
    this.reclamoService.getReclamosSinResolver().subscribe((data: ReclamoResueltosDTO[]) => {
      const adaptado = data.map(dto => ({
        id: dto.id,
        asunto: dto.asunto,
        fecha: new Date(dto.fecha),
        descripcion: dto.descripcion,
        resuelto: dto.resuelto,
        usuario: dto.usuario // solo es el ID
      }));
      this.dataSource = new MatTableDataSource(adaptado);
      this.dataSource.paginator = this.paginator;
    });
  }
  listarTodos(): void {
  this.reclamoService.list().subscribe((data: Reclamo[]) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  });
}

}
