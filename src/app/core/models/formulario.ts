import { Aislamiento } from "./aislamiento";
import { Apantallamiento } from "./apantallamiento";
import { Bases } from "./bases";
import { CableConductor } from "./cableConductor";
import { Estructura } from "./estructura";
import { Estructuraa } from "./estructuraa";
import { Persona } from "./persona";
import { Servidumbre } from "./servidumbre";
import { Spt } from "./spt";
import { Transposicion } from "./transposicion";
import { Ubicacion } from "./ubicacion";

export class Formulario {
  constructor(
    public idInspeccion: string = null,
    public estructura: Estructura = null,
    public idApantallamiento: Apantallamiento = null,
    public idTorres: Estructuraa = null,
    public idCableConductor: CableConductor = null,
    public idAisladores: Aislamiento = null,
    public idBases: Bases = null,
    public idSpt: Spt = null,
    public idServidumbre: Servidumbre = null,
    public idtransposicion: Transposicion = null,
    public idUbicacion: Ubicacion = null,
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