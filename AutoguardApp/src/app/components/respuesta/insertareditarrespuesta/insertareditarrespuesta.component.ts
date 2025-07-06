import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RespuestaService } from '../../../services/respuesta.service';
import { Respuesta } from '../../../models/respuesta';
import { Consulta } from '../../../models/consulta';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertareditarrespuesta',
  standalone: true,
  templateUrl: './insertareditarrespuesta.component.html',
  styleUrl: './insertareditarrespuesta.component.css',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
})
export class InsertareditarrespuestaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  respuesta: Respuesta = new Respuesta();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private rS: RespuestaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      texto: ['', Validators.required],
      consultaId: [null, Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.respuesta.texto = this.form.value.texto;
      this.respuesta.consulta = { id: this.form.value.consultaId } as Consulta;

      console.log(JSON.stringify(this.respuesta));

      if (this.edicion) {
        this.respuesta.id = this.id;
        this.rS.update(this.respuesta).subscribe(() => {
          this.rS.list().subscribe((data) => this.rS.setList(data));
          this.router.navigate(['/respuestas/listarrespuesta']);
        });
      } else {
        this.rS.insert(this.respuesta).subscribe(() => {
          this.rS.list().subscribe((data) => this.rS.setList(data));
          this.router.navigate(['/respuestas/listarrespuesta']);
        });
      }
    }
  }

  cancelar() {
    this.router.navigate(['/respuesta/listarrespuesta']);
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          texto: new FormControl(data.texto),
          consultaId: new FormControl(data.consulta.id),
        });
      });
    }
  }
}
