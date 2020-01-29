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

export interface Grado {
    idGradoParalelo: number,
    idGrado: number,
    idParalelo: number,
}