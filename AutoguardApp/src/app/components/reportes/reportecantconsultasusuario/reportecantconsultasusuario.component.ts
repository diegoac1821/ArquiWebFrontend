import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ConsultaService } from '../../../services/consulta.service';

Chart.register(...registerables);

@Component({
  selector: 'app-reportecantconsultasusuario',
  imports: [BaseChartDirective],
  templateUrl: './reportecantconsultasusuario.component.html',
  styleUrl: './reportecantconsultasusuario.component.css'
})
export class ReportecantconsultasusuarioComponent implements OnInit {
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];

  // Colores institucionales
  asignarColor(): string[] {
    return [
      '#5BC0E4', // celeste claro (fondo de barra)
      '#472F64', // morado oscuro (puede alternar en border)
      '#27193E'  // más oscuro (para detalles)
    ];
  }

  // Opciones del gráfico (estilo, etiquetas, leyenda, etc.)
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de Consultas',
          font: {
            size: 14
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Usuarios',
          font: {
            size: 14
          }
        },
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 13,
            family: 'Akshar'
          }
        }
      },
      title: {
        display: true,
        text: 'Cantidad de Consultas por Usuario',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Akshar'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      }
    }
  };

  constructor(private conS: ConsultaService) {}

  ngOnInit(): void {
    this.conS.getQuantity().subscribe(data => {
      this.barChartLabels = data.map(item => `${item.nombres} ${item.apellidos}`);

      const colores = this.asignarColor();

      this.barChartData = [{
        data: data.map(item => item.cantidadConsultas),
        label: 'Cantidad de Consultas',
        backgroundColor: colores,
        borderColor: '#27193E',
        borderWidth: 1
      }];

      if (this.chart) {
        this.chart.update();
      }
    });
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
}
