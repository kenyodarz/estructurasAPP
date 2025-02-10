export class Persona {
  constructor(
    public cedulaPersona: string = null,
    public nombrePersona: string = null,
    public apellidoPersona: number = null,
    public telefonoPersona: string = null,
    public usuario: string = null,
    public password: string = null,
    public estadoActivo: boolean = null,
    public esAdministrador: boolean = null,
  ) {}
}
