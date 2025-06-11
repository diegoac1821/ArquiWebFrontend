import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Ruta } from '../../../models/ruta';
import { RutaService } from '../../../services/ruta.service';

@Component({
  selector: 'app-listarruta',
  standalone: true,
  imports: [CommonModule, MatTableModule],
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
    'placa'
  ];

  constructor(private rutaService: RutaService) {}

  ngOnInit(): void {
    this.rutaService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
