import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Reclamo } from '../../../models/reclamo';
import { ReclamoService } from '../../../services/reclamo.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-listarreclamo',
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
  templateUrl: './listarreclamo.component.html',
  styleUrl: './listarreclamo.component.css',
})
export class ListarreclamoComponent implements OnInit {
  dataSource: MatTableDataSource<Reclamo> = new MatTableDataSource<Reclamo>();

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
    this.reclamoService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; // asignación aquí también por si acaso
     
    });
    this.reclamoService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; // asignación aquí también por si acaso
    });
  }

  eliminar(id: number) {
    this.reclamoService.delete(id).subscribe(() => {
      this.reclamoService.list().subscribe((data) => {
        this.reclamoService.setList(data);
      });
    });
  }
}
