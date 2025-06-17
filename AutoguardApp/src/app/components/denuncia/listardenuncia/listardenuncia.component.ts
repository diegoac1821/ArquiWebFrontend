import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Denuncia } from '../../../models/denuncia';
import { DenunciaService } from '../../../services/denuncia.service';

@Component({
  selector: 'app-listardenuncia',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listardenuncia.component.html',
  styleUrl: './listardenuncia.component.css'
})
export class ListardenunciaComponent implements OnInit {
  dataSource: MatTableDataSource<Denuncia> = new MatTableDataSource<Denuncia>();

  displayedColumns: string[] = ['id', 'descripcion', 'motivo', 'estado', 'comisaria', 'vehiculo'];

  constructor(private dS: DenunciaService) {}

  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}