import { Fase } from "./fase";

export class Aislamiento {
  constructor(
    public idAislamiento: string = null,
    public fase: string = null,
    public fases: Array<Fase> = null
  ) {}
}