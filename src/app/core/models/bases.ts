import { SubBase } from './subBase';

export class Bases {
  constructor(
    public idBase: string = null,
    public buenEstado: boolean = null,
    public subbases: Array<SubBase> = null,
    public obsBase: string = null,
  ) {}
}
