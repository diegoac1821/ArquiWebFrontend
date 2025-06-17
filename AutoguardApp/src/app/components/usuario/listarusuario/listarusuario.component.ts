import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarusuario',
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule],
})
export class ListarusuarioComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = [
  'dni',
  'nombres',
  'apellidos',
  'correo_electronico',
  'telefono',
  'enabled',
  'editar',
  'eliminar'
];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.usuarioService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.usuarioService.delete(id).subscribe(() => {
      this.usuarioService.list().subscribe(data => {
        this.usuarioService.setList(data);
      });
    });
  }
}

