import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Reclamo } from '../../../models/reclamo';
import { ReclamoService } from '../../../services/reclamo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarreclamo',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './listarreclamo.component.html',
  styleUrl: './listarreclamo.component.css'
})
export class ListarreclamoComponent  implements OnInit{
   dataSource: MatTableDataSource<Reclamo> = new MatTableDataSource<Reclamo>();

  displayedColumns: string[] = ['id','asunto','fecha','descripcion','resuelto','usuario'];

  constructor(private reclamoService: ReclamoService) {}

  ngOnInit(): void {
    this.reclamoService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

}
