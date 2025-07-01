import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConsultaService } from '../../../services/consulta.service';
import { Reclamo } from '../../../models/reclamo';
import { Usuario } from '../../../models/usuario';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReclamoService } from '../../../services/reclamo.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-insertareditarreclamos',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule
  ],
  templateUrl: './insertareditarreclamos.component.html',
  styleUrl: './insertareditarreclamos.component.css',
})
export class InsertareditarreclamosComponent {
  form: FormGroup = new FormGroup({});
  reclamo: Reclamo = new Reclamo();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private rS: ReclamoService,
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
      codigo: [''],
      asunto: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      resuelto: [true, Validators.required],
      usuarioId: [null, Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.reclamo.id = this.form.value.codigo;
      this.reclamo.asunto = this.form.value.asunto;
      this.reclamo.fecha = this.form.value.fecha;
      this.reclamo.descripcion = this.form.value.descripcion;
      this.reclamo.resuelto = this.form.get('resuelto')?.value;
      this.reclamo.usuario.id = this.form.value.usuarioId;

      if (this.edicion) {
        this.reclamo.id = this.id;
        this.rS.update(this.reclamo).subscribe(() => {
          this.rS.list().subscribe((data) => 
            this.rS.setList(data));
        });
        this.router.navigate(['/reclamo/listarreclamo']);
      } else {
        this.rS.insert(this.reclamo).subscribe(() => {
          this.rS.list().subscribe((data) => 
          this.rS.setList(data));
        });
        this.router.navigate(['/reclamo/listarreclamo']);
      }
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          asunto: new FormControl(data.asunto),
          fecha: new FormControl(data.fecha),
          descripcion: new FormControl(data.descripcion),
          resuelto: new FormControl(data.resuelto, Validators.required),
          usuarioId: new FormControl(data.usuario.id),
        });
      });
    }
  }
}
