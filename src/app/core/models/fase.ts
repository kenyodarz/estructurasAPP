import { Aislamiento } from './aislamiento';

export class Fase {
  constructor(
    public idFase: string = null,
    public fase: string = null,
    public tipo: string = null,
    public clase: string = null,
    public buenEstado: boolean = null,
    public numAisladores: number = null,
    public tipoCadena: string = null,
    public puentes: string = null,
    public observaciones: string = null,
    public Aislamiento: Aislamiento = null,
  ) {}
}
