import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Respuesta } from '../../../models/respuesta';
import { RespuestaService } from '../../../services/respuesta.service';

@Component({
  selector: 'app-listarrespuesta',
  imports: [MatTableModule],
  templateUrl: './listarrespuesta.component.html',
  styleUrl: './listarrespuesta.component.css'
})
export class ListarrespuestaComponent implements OnInit{
   dataSource: MatTableDataSource<Respuesta> = new MatTableDataSource<Respuesta>();

  displayedColumns: string[] = ['id', 'texto','consulta'];

  constructor(private rS: RespuestaService) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }


}
