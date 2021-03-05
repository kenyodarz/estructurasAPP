import { CableConductor } from "./cableConductor";

export class Deshilachado {
  constructor(
    public idDeshilachado: string = null,
    public fase: string = null,
    public numeroHilos: number = null,
    public distancia: number = null,
    public cableConductor: CableConductor = null
  ) {}
}