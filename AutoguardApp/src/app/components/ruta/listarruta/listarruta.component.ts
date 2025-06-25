import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Ruta } from '../../../models/ruta';
import { RutaService } from '../../../services/ruta.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listarruta',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './listarruta.component.html',
  styleUrls: ['./listarruta.component.css']
})
export class ListarrutaComponent implements OnInit {
  dataSource: MatTableDataSource<Ruta> = new MatTableDataSource<Ruta>();

  displayedColumns: string[] = [
    'id',
    'origenLatitud',
    'origenLongitud',
    'destinoLatitud',
    'destinoLongitud',
    'fecha',
    'duracion',
    'distancia',
    'placa',
    'editar',
    'eliminar'
  ];

  constructor(private rutaService: RutaService) {}

  ngOnInit(): void {
    this.rutaService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
    eliminar(id: number) {
    this.rutaService.delete(id).subscribe(() => {
      this.rutaService.list().subscribe(data => {
        this.rutaService.setList(data);
      });
    });
  }
}
