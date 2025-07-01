import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Denuncia } from '../../../models/denuncia';
import { DenunciaService } from '../../../services/denuncia.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-listardenuncia',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule, MatPaginatorModule],
  templateUrl: './listardenuncia.component.html',
  styleUrl: './listardenuncia.component.css'
})
export class ListardenunciaComponent implements OnInit {
  dataSource: MatTableDataSource<Denuncia> = new MatTableDataSource<Denuncia>();

  displayedColumns: string[] = ['id', 'descripcion', 'motivo', 'estado', 'comisaria', 'vehiculo', 'editar', 'eliminar'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dS: DenunciaService) {}

  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.dS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.dS.delete(id).subscribe(() => {
      this.dS.list().subscribe(data => {
        this.dS.setList(data);
      });
    });
  }
}