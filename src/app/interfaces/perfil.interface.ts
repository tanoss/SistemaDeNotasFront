import { SistemasData } from "./sistema.interface";

export interface PerfilS {
  perId?: number;
  perNombre?: string;
  segSistemas?: SistemasData;
}

export interface PerfilData {
  perId: number;
  perNombre: string;
  sisId: number;
  sisNombre: string;
  sisUrlSistema: string;
}

export interface PerfilData1 {
  perId: number;
  perNombre: string;
  sisId: number;
  sisNombre: string;

}

export interface PerfilData2 {
  perId: number;
  perNombre: string;
  sisId: number;
}
