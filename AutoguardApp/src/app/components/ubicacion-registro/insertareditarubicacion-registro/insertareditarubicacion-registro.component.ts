import { Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ubicacion_registro } from '../../../models/ubicacion_registro';
import { UbicacionRegistroService } from '../../../services/ubicacion-registro.service';
import { MatNativeDateModule } from '@angular/material/core';
import { Dispositivo_GPS } from '../../../models/dispositivo_GPS';


@Component({
  selector: 'app-insertareditarubicacion-registro',
  imports: [ ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule
  ],
  templateUrl: './insertareditarubicacion-registro.component.html',
  styleUrl: './insertareditarubicacion-registro.component.css'
})
export class InsertareditarubicacionRegistroComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  ubicacion: ubicacion_registro = new ubicacion_registro();
  estado: boolean = true;

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private urS: UbicacionRegistroService,
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
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      dgps: [null, Validators.required],
     
    });
  }

  aceptar() {
  console.log('👉 Se hizo clic en Aceptar');
  console.log('📝 Formulario válido:', this.form.valid);
  console.log('📦 Datos del formulario:', this.form.value);

  if (this.form.valid) {
    this.ubicacion.latitud = this.form.value.latitud;
    this.ubicacion.longitud = this.form.value.longitud;
    this.ubicacion.fecha = this.form.value.fecha;
    this.ubicacion.hora = this.form.value.hora;
    this.ubicacion.dgps = this.form.value.dgps;
    this.ubicacion.dgps = new Dispositivo_GPS();
    this.ubicacion.dgps.id = this.form.value.dgps;

  
    if (this.edicion) {
      this.ubicacion.id = this.id;
      console.log('🆔 Editando ubicacion con ID:', this.ubicacion.id);

      this.urS.update(this.ubicacion).subscribe(() => {
        console.log('✅ Ubicacion actualizado');
        this.urS.list().subscribe((data) => {
          this.urS.setList(data);
        });
        this.router.navigate(['/ubicacion-registro/listarubicacion-registro']);
      });
    } else {
      console.log('➕ Insertando nuevo Ubicacion');
      this.urS.insert(this.ubicacion).subscribe(() => {
        console.log('✅ Ubicacion insertado');
        this.urS.list().subscribe((data) => {
          this.urS.setList(data);
        });
        this.router.navigate(['/ubicacion-registro/listarubicacion-registro']);
      });
    }
  } else {
    console.warn('❌ Formulario inválido');
  }
}


  init() {
    if (this.edicion) {
      this.urS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          latitud: new FormControl(data.latitud),
          longitud: new FormControl(data.longitud),
          fecha: new FormControl(data.fecha),
          hora: new FormControl(data.hora),
          dgps: new FormControl(data.dgps.id),

        });
      });
    }
  }

}



