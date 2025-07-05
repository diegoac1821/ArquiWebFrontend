import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ComisariaService } from '../../../services/comisaria.service';
import { Chart, registerables } from 'chart.js';

// Registrar todos los módulos de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-reportecantdenuncias',
  imports: [BaseChartDirective],
  templateUrl: './reportecantdenuncias.component.html',
  styleUrls: ['./reportecantdenuncias.component.css']
})
export class ReportecantdenunciasComponent implements OnInit {
  // Tipo de gráfico y configuración
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  // Etiquetas del eje X (comisarías)
  barChartLabels: string[] = [];

  // Datos del gráfico
  barChartData: ChartDataset[] = [];

  // Opciones visuales mejoradas
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de Denuncias',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Comisarías',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 13,
            family: 'Akshar',
          },
        },
      },
      title: {
        display: true,
        text: 'Cantidad de Denuncias por Comisaría',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Akshar',
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
  };

  constructor(private cS: ComisariaService) {}

  // Función para asignar colores fijos
  asignarColor(): string[] {
    return [
      '#5BC0E4', // Primer color (color de fondo)
      '#472F64', // Segundo color (color de título)
      '#27193E', // Tercer color (color de botón)
    ];
  }

  ngOnInit(): void {
    this.cS.getQuantity().subscribe((data) => {
      // Asignación de etiquetas del gráfico
      this.barChartLabels = data.map((item) => item.nombre);  

      // Colores fijos predefinidos
      const coloresFijos = this.asignarColor();

      // Asignación de los datos y configuraciones del gráfico
      this.barChartData = [
        {
          data: data.map((item) => item.denunciasporcomisaria),
          label: 'Cantidad de Denuncias',
          backgroundColor: coloresFijos,  // Colores predefinidos
          borderColor: '#27193E', // Borde con el mismo color
          borderWidth: 1,
        },
      ];

      // Forzar actualización del gráfico si es necesario
      if (this.chart) {
        this.chart.update(); // Actualiza el gráfico
      }
    });
  }

  // Acceso al gráfico para actualización
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
}



