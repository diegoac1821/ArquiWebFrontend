import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Alerta } from '../../../models/alerta';
import { AlertaService } from '../../../services/alerta.service';

@Component({
  selector: 'app-listaralerta',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './listaralerta.component.html',
  styleUrls: ['./listaralerta.component.css']
})
export class ListaralertaComponent implements OnInit {
  dataSource: MatTableDataSource<Alerta> = new MatTableDataSource<Alerta>();

  displayedColumns: string[] = ['id', 'asunto', 'fecha', 'descripcion', 'placa'];

  constructor(private alertaService: AlertaService) {}

  ngOnInit(): void {
    this.alertaService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
