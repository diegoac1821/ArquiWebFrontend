import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Alerta } from '../../../models/alerta';
import { AlertaService } from '../../../services/alerta.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listaralerta',
  standalone: true,
  imports: [CommonModule, MatTableModule,MatIconModule, RouterLink, CommonModule],
  templateUrl: './listaralerta.component.html',
  styleUrls: ['./listaralerta.component.css']
})
export class ListaralertaComponent implements OnInit {
  dataSource: MatTableDataSource<Alerta> = new MatTableDataSource<Alerta>();

  displayedColumns: string[] = ['id', 'asunto', 'fecha', 'descripcion', 'placa', 'editar', 'eliminar'];

  constructor(private alertaService: AlertaService) {}

  ngOnInit(): void {
    this.alertaService.list().subscribe((data) => {
      
      this.dataSource = new MatTableDataSource(data);
    });    
    this.alertaService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
   eliminar(id: number) {
    this.alertaService.delete(id).subscribe(() => {
      this.alertaService.list().subscribe(data => {
        this.alertaService.setList(data);
      });
    });
  }
}
