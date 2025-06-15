import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

import { ComisariaService } from '../../../services/comisaria.service';
import { Comisaria } from '../../../models/comisaria';

@Component({
  selector: 'app-listarcomisaria',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './listarcomisaria.component.html',
  styleUrls: ['./listarcomisaria.component.css']
})
export class ListarcomisariaComponent implements OnInit {
  dataSource: MatTableDataSource<Comisaria> = new MatTableDataSource<Comisaria>();

  displayedColumns: string[] = ['id', 'nombre', 'direccion', 'distrito', 'telefono'];

  constructor(private comisariaService: ComisariaService) {}

  ngOnInit(): void {
    this.comisariaService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
