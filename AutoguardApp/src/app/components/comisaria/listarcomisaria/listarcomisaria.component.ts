import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ComisariaService } from '../../../services/comisaria.service';
import { Comisaria } from '../../../models/comisaria';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-listarcomisaria',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './listarcomisaria.component.html',
  styleUrls: ['./listarcomisaria.component.css'],
})
export class ListarcomisariaComponent implements OnInit {
  dataSource: MatTableDataSource<Comisaria> = new MatTableDataSource<Comisaria>();

  displayedColumns: string[] = [
    'id',
    'nombre',
    'direccion',
    'distrito',
    'telefono',
    'editar',
    'eliminar',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private comisariaService: ComisariaService) {}

  ngOnInit(): void {
    this.comisariaService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.comisariaService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  distritoFiltro: string = '';
  
  filtrarComisariaDistrito(): void {
  if (this.distritoFiltro.trim() === '') return;

  this.comisariaService.getComisariaporDistrito(this.distritoFiltro).subscribe((data: Comisaria[]) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  });
}
  

  eliminar(id: number) {
    this.comisariaService.delete(id).subscribe(() => {
      this.comisariaService.list().subscribe((data) => {
        this.comisariaService.setList(data);
      });
    });
  }
}
