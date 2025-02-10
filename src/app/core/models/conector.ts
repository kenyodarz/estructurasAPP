import { Apantallamiento } from './apantallamiento';

export class Conector {
  constructor(
    public idConector: string = null,
    public sulfatados: boolean = null,
    public quemados: boolean = null,
    public reposicion: boolean = null,
    public buenos: boolean = null,
    public apantallamiento: Apantallamiento = null,
  ) {}
}
