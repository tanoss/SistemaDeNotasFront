import { SistemasData } from "./sistema.interface";

export interface Opciones {
  perId: number;
  opcId: number;
}

export interface OpcionS {
  opcId?: number;
  opcNombre?: string;
  opcNivel?: number;
  opcOrden?: number;
  opcUrl?: string;
  segSistemas?: SistemasData;
}

export interface OpcionData {
  opcId: number;
  opcNombre: string;
  opcNivel: number;
  opcOrden: number;
  opcUrl: string;
  sisNombre: string;
  sisId: number;
  //  opcImagen: string;
}

export interface OpcionData1 {
  opcId: number;
  opcNombre: string;
  opcNivel: number;
  opcOrden: number;
  opcUrl: string;
  sisNombre: string;
  sisId: number | string;
}
