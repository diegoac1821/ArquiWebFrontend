import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConsultaService } from '../../../services/consulta.service';
import { Consulta } from '../../../models/consulta';
import { Usuario } from '../../../models/usuario';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-insertareditarconsulta',
  standalone: true,
  templateUrl: './insertareditarconsulta.component.html',
  styleUrl: './insertareditarconsulta.component.css',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class InsertareditarconsultaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  consulta: Consulta = new Consulta();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private cS: ConsultaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      consulta: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      usuarioId: [null, Validators.required]
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.consulta.consulta = this.form.value.consulta;
      this.consulta.fecha = this.form.value.fecha;
      this.consulta.hora = this.form.value.hora;
      this.consulta.usuario = new Usuario();
      this.consulta.usuario.id = this.form.value.usuarioId;

      if (this.edicion) {
        this.consulta.id = this.id;
        this.cS.update(this.consulta).subscribe(() => {
          this.cS.list().subscribe(data => this.cS.setList(data));
          this.router.navigate(['/consulta/listarconsulta']);
        });
      } else {
        this.cS.insert(this.consulta).subscribe(() => {
          this.cS.list().subscribe(data => this.cS.setList(data));
          this.router.navigate(['/consulta/listarconsulta']);
        });
      }
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          consulta: new FormControl(data.consulta),
          fecha: new FormControl(new Date(data.fecha)),
          hora: new FormControl(data.hora),
          usuarioId: new FormControl(data.usuario.id)
        });
      });
    }
  }
}
