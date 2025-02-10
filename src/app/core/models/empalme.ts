import { CableConductor } from './cableConductor';

export class Empalme {
  constructor(
    public idEmpalme: string = null,
    public fase: string = null,
    public cantidadManual: number = null,
    public cantidadFullTension: number = null,
    public cantidadBlindaje: number = null,
    public noAplica: boolean = null,
    public cableConductor: CableConductor = null,
  ) {}
}
