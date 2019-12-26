export interface Usua {
  perId: number;
  usuId: number;
}



export interface Usuario {
  usuId?: number;
  usuCc?: string;
  usuNombres?: string;
  usuApellidos?: string;
  usuEmail?: string;
  usuFecharegistro?: Date;
  usuEstado?: string;
  spridenId?: string;
  spridenPidm?: number;
}

export interface UsuarioData {
  usuId: number;
  usuCc: string;
  usuNombres: string;
  usuApellidos: string;
  usuEmail: string;
  usuFecharegistro: Date;
  usuEstado: string;
  spridenId: string;
  spridenPidm: number;
}

export interface Usuario {
  nombre: string;
  apellido: string;
  cedula: string;
  telefono: string;
  id: string;
  perfil: string;
  pidm: string;
  email: String;
  departamento: String;
}