import { Component, OnInit } from '@angular/core';
import { Roles } from '../../../models/rol';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { RolService } from '../../../services/rol.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-listarrol',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './listarrol.component.html',
  styleUrl: './listarrol.component.css',
})
export class ListarrolComponent implements OnInit {
  dataSource: MatTableDataSource<Roles> = new MatTableDataSource<Roles>();
  displayedColumns: string[] = ['id', 'rol', 'user'];

  constructor(private rolService: RolService) {}

  ngOnInit(): void {
    this.rolService.list().subscribe((data) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
  }
  cambiarRol(id: number, nuevoRol: string) {
    this.rolService.cambiarRol(id, nuevoRol).subscribe(() => {
      // Refrescar tabla
      this.rolService.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    });
  }
}
