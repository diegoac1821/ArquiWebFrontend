import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-listarusuario',
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
})
export class ListarusuarioComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = [
    'dni',
    'enabled',
    'estado',
    'editar',
    'eliminar',
    'perfil',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.usuarioService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.usuarioService.delete(id).subscribe(() => {
      this.usuarioService.list().subscribe((data) => {
        this.usuarioService.setList(data);
      });
    });
  }
  cambiarEstado(usuario: Usuario) {
    console.log('Usuario antes del cambio:', usuario);

    this.usuarioService.cambiarEstado(usuario.id).subscribe({
      next: () => {
        usuario.enabled = !usuario.enabled;
        console.log('Estado cambiado. Nuevo estado:', usuario.enabled);
      },
      error: (err) => {
        console.error('Error al cambiar el estado:', err);
      },
    });
  }
}
