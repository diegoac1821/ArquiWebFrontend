import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RespuestaService } from '../../../services/respuesta.service';
import { Respuesta } from '../../../models/respuesta';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarrespuesta',
  templateUrl: './listarrespuesta.component.html',
  styleUrl: './listarrespuesta.component.css',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    MatPaginatorModule
  ]
})
export class ListarrespuestaComponent implements OnInit {
  dataSource: MatTableDataSource<Respuesta> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'texto',
    'consulta',
    'editar',
    'eliminar'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private respuestaService: RespuestaService) {}

  ngOnInit(): void {
    this.respuestaService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.respuestaService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.respuestaService.delete(id).subscribe(() => {
      this.respuestaService.list().subscribe(data => {
        this.respuestaService.setList(data);
      });
    });
  }
}
