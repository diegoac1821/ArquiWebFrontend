import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Denuncia } from '../../../models/denuncia';
import { DenunciaService } from '../../../services/denuncia.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LoginService } from '../../../services/login.service';
import { UsuarioService } from '../../../services/usuario.service';
@Component({
  selector: 'app-listardenuncia',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    MatPaginatorModule,
  ],
  templateUrl: './listardenuncia.component.html',
  styleUrl: './listardenuncia.component.css',
})
export class ListardenunciaComponent implements OnInit {
  dataSource: MatTableDataSource<Denuncia> = new MatTableDataSource<Denuncia>();

  displayedColumns: string[] = [
    'id',
    'descripcion',
    'motivo',
    'estado',
    'comisaria',
    'vehiculo',
    'editar',
    'eliminar',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dS: DenunciaService,
    private loginService: LoginService,
    private usuarioService: UsuarioService
  ) {}

  get isAdmin(): boolean {
    return this.loginService.showRole() === 'ADMIN';
  }

  ngOnInit(): void {
    const rol = this.loginService.showRole();

    if (rol === 'CLIENTE') {
      const username = this.loginService.getUsername();
      if (username) {
        this.usuarioService.buscarPorUsername(username).subscribe((usuario) => {
          this.dS.list().subscribe((data: Denuncia[]) => {
            const denunciasFiltradas = data.filter(
              (d) => d.vehiculo?.usuario?.id === usuario.id
            );
            this.dataSource = new MatTableDataSource(denunciasFiltradas);
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
            });
          });
        });
      }
    } else {
      this.dS.list().subscribe((data: Denuncia[]) => {
        this.dataSource = new MatTableDataSource(data);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });
      });
    }
  }

  eliminar(id: number): void {
    this.dS.delete(id).subscribe(() => {
      const username = this.loginService.getUsername();
      const esCliente = this.loginService.showRole() === 'CLIENTE';

      if (esCliente && username) {
        this.usuarioService.buscarPorUsername(username).subscribe((usuario) => {
          this.dS.list().subscribe((data: Denuncia[]) => {
            const denunciasFiltradas = data.filter(
              (d) => d.vehiculo?.usuario?.id === usuario.id
            );
            this.dataSource = new MatTableDataSource(denunciasFiltradas);
            this.dataSource.paginator = this.paginator;
          });
        });
      } else {
        this.dS.list().subscribe((data: Denuncia[]) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        });
      }
    });
  }
  filtrarPorEstado(estado: string): void {
    this.dS.list().subscribe((data: Denuncia[]) => {
      const filtrado = data.filter(
        (d) => d.estado.toLowerCase().trim() === estado.toLowerCase().trim()
      );
      this.dataSource = new MatTableDataSource(filtrado);
      this.dataSource.paginator = this.paginator;
    });
  }

  listarTodos(): void {
    this.dS.list().subscribe((data: Denuncia[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  cerrarDenuncia(denuncia: Denuncia): void {
    const denunciaActualizada: Denuncia = {
      ...denuncia,
      estado: 'Cerrado',
    };

    this.dS.update(denunciaActualizada).subscribe(() => {
      this.dS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
