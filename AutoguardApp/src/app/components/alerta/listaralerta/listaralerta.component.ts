import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Alerta } from '../../../models/alerta';
import { AlertaService } from '../../../services/alerta.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listaralerta',
  standalone: true,
  imports: [ MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    MatPaginatorModule
    ],
  templateUrl: './listaralerta.component.html',
  styleUrls: ['./listaralerta.component.css'],
})
export class ListaralertaComponent implements OnInit {
  dataSource: MatTableDataSource<Alerta> = new MatTableDataSource<Alerta>();
  displayedColumns: string[] = [
    'id',
    'asunto',
    'fecha',
    'descripcion',
    'vehiculo',
    'editar',
    'eliminar',
  ];

  constructor(private alertaService: AlertaService) {}

  ngOnInit(): void {
    this.alertaService.list().subscribe((data) => {
      console.log('Alertas recibidas:', data); // Verifica si viene la placa
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.alertaService.delete(id).subscribe(() => {
      this.alertaService.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    });
  }
}
