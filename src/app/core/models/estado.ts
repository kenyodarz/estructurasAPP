import { Apantallamiento } from './apantallamiento';

export class Estado {
  constructor(
    public idEstado: string = null,
    public buenos: boolean = null,
    public noTieneBlin: boolean = null,
    public rotos: boolean = null,
    public empalmeMalEstado: boolean = null,
    public herrajeMalEstado: boolean = null,
    public apantallamiento: Apantallamiento = null,
  ) {}
}
