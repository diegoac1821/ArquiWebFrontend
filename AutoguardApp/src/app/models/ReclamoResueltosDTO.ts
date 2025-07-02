export interface ReclamoResueltosDTO {
  id: number;
  asunto: string;
  fecha: string;
  descripcion: string;
  resuelto: boolean;
  usuario: number; // solo el ID
}
