import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { ConsultaService } from '../../../services/consulta.service';
import { Consulta } from '../../../models/consulta';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarconsulta',
  templateUrl: './listarconsulta.component.html',
  styleUrl: './listarconsulta.component.css',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule, MatPaginatorModule],
})
export class ListarconsultaComponent implements OnInit {
  dataSource: MatTableDataSource<Consulta> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'consulta',
    'fecha',
    'hora',
    'usuario',
    'editar',
    'eliminar'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private consultaService: ConsultaService) {}

  ngOnInit(): void {
    this.consultaService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.consultaService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.consultaService.delete(id).subscribe(() => {
      this.consultaService.list().subscribe(data => {
        this.consultaService.setList(data);
      });
    });
  }
}
