export interface SistemasData {
  sisId?: number;
  sisNombre?: string;
  sisUrlSistema?: string;
  sisEstado?: number;
}

export interface SistemaListData {
  sisId: number | string;
  sisNombre: string;
}

export interface SistemasData1 {
  sisId: number;
  sisNombre: string;
  sisUrlSistema: string;
  sis_estado: boolean;
}
