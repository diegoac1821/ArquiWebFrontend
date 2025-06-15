import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { ConsultaService } from '../../../services/consulta.service';
import { Consulta } from '../../../models/consulta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarconsulta',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './listarconsulta.component.html',
  styleUrls: ['./listarconsulta.component.css']
})
export class ListarconsultaComponent implements OnInit {
  dataSource: MatTableDataSource<Consulta> = new MatTableDataSource<Consulta>();
  displayedColumns: string[] = ['id', 'consulta', 'fecha', 'hora', 'usuario'];

  constructor(private cS: ConsultaService) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}

