import { UbicacionOne } from "./ubicacionOne";

export class Ubicacion {
  constructor(
    public idUbicacion: string = null,
    public OneOrTwo: string = null,
    public ubicacionesOne: Array<UbicacionOne> = null
  ) {}
}