import { Estructura } from "./estructura";
import { Persona } from "./persona";

export class Formulario {
  constructor(
    public idInspeccion: string = null,
    public estructura: Estructura = null,
    public idApantallamiento: string = null,
    public idTorres: number = null,
    public idCableConductor: string = null,
    public idAisladores: boolean = null,
    public idBases: string = null,
    public idSpt: string = null,
    public idServidumbre: string = null,
    public idtransposicion: string = null,
    public idUbicacion: string = null,
    public observaciones: string = null,
    public numeroOT: string = null,
    public persona: Persona = null,
    public nombre2: string = null,
    public nombre3: string = null,
    public nombre4: string = null,
    public nombre5: string = null,
    public codigo1: string = null,
    public codigo2: string = null,
    public codigo3: string = null,
    public codigo4: string = null,
    public codigo5: string = null,
    public fecha: Date = null,
    public movil: string = null,
    public reviso: string = null,
    public codigoRevisor: string = null,
    public firma: string = null,
    public fechaRevisor: Date = null
  ) {}
}