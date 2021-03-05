export class CableConductor {
  constructor(
    public idCableConductor: string = null,
    public calibreCableConductor: string = null,
    public amortiguadorCableConductor: boolean = null,
    public cantidadAmortiguadores: number = null,
    public buenEstadoConductor: boolean = null,
    public embarrilado: boolean = null,
    public deshilachado: boolean = null,
    public faseEmbarrilado: string = null,
    public cantidadEmbarrilado: number = null,
    public observacionesCableConductor: string = null
  ) {}
}