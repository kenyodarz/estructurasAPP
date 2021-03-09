import { Deshilachado } from "./deshilachado";
import { Empalme } from "./empalme";

export class CableConductor {
  constructor(
    public idCableConductor: string = null,
    public calibreCableConductor: string = null,
    public amortiguadorCableConductor: boolean = null,
    public cantidadAmortiguadores: number = null,
    public buenEstadoConductor: boolean = null,
    public embarrilado: boolean = null,
    public empalmes: Array<Empalme> = null,
    public deshilachado: Array<Deshilachado> = null,
    public faseEmbarrilado: string = null,
    public cantidadEmbarrilado: number = null,
    public observacionesCableConductor: string = null
  ) {}
}