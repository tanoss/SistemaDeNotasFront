export interface Persona {
    idTipoUsuario?: number,
    cedula?: string,
    nombre?: string,
    apellido?: string,
    correo?: string,
    direccion?: string,
    telefonoConvencional?: string,
    telefonoCelular?: string,
    referenciaPersNombre?: string,
    referenciaPersTelf?: string
}

export interface libro {
    id: number,
    genero: string,
    isb: string,
    id_Autor: number
}