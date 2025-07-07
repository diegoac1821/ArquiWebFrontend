import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Comisaria } from '../../../models/comisaria';
import { ComisariaService } from '../../../services/comisaria.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertareditarcomisaria',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './insertareditarcomisaria.component.html',
  styleUrl: './insertareditarcomisaria.component.css',
})
export class InsertareditarcomisariaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  comisaria: Comisaria = new Comisaria();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private comisariaService: ComisariaService,
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
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      distrito: ['', Validators.required],
      telefono: [
        '',
        [
          Validators.required,
          Validators.pattern(/^9\d{8}$/), 
        ],
      ],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.comisaria.id = this.form.value.codigo;
      this.comisaria.nombre = this.form.value.nombre;
      this.comisaria.direccion = this.form.value.direccion;
      this.comisaria.distrito = this.form.value.distrito;
      this.comisaria.telefono = this.form.value.telefono;

      if (this.edicion) {
        this.comisaria.id = this.id;
        this.comisariaService.update(this.comisaria).subscribe(() => {
          this.comisariaService
            .list()
            .subscribe((data) => this.comisariaService.setList(data));
          this.router.navigate(['/comisaria/listarcomisaria']);
        });
      } else {
        this.comisariaService.insert(this.comisaria).subscribe(() => {
          this.comisariaService
            .list()
            .subscribe((data) => this.comisariaService.setList(data));
          this.router.navigate(['/comisaria/listarcomisaria']);
        });
      }
    }
  }

  cancelar() {
    this.router.navigate(['/comisaria/listarcomisaria']);
  }

  init() {
    if (this.edicion) {
      this.comisariaService.listId(this.id).subscribe((data) => {
        this.comisaria = data;
        this.form = this.formBuilder.group({
          codigo: [data.id],
          nombre: [data.nombre, Validators.required],
          direccion: [data.direccion, Validators.required],
          distrito: [data.distrito, Validators.required],
          telefono: [
            data.telefono,
            [Validators.required, Validators.pattern(/^9\d{8}$/)],
          ],
        });
      });
    }
  }
}
