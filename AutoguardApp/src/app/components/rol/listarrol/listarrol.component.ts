import { Component, OnInit } from '@angular/core';
import { Roles } from '../../../models/rol';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-listarrol',
  imports: [MatTableModule],
  templateUrl: './listarrol.component.html',
  styleUrl: './listarrol.component.css'
})
export class ListarrolComponent implements OnInit{
  dataSource: MatTableDataSource<Roles> = new MatTableDataSource<Roles>();
  displayedColumns: string[] = ['id', 'rol' , 'user'];

  constructor(private rolService: RolService) {}

  ngOnInit(): void {
    this.rolService.list().subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
  }
}


