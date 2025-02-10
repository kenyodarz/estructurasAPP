import { Bases } from './bases';

export class SubBase {
  constructor(
    public idSubBase: string = null,
    public buena: boolean = null,
    public enterrada: boolean = null,
    public fracturada: boolean = null,
    public bases: Bases = null,
    public base: string = null,
  ) {}
}
