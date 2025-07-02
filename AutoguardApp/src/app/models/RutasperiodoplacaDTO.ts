export interface RutasperiodoplacaDTO {
  distancia: number;
  duracion: string; // LocalTime llega como string tipo "HH:mm:ss"
  fecha: string; // LocalDate llega como string tipo "yyyy-MM-dd"
  id: number;
  destinoLatitud: string;
  destinoLongitud: string;
  origenLatitud: string;
  origenLongitud: string;
  placa: string;
}
