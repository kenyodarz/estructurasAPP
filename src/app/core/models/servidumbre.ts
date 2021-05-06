export class Servidumbre {
  constructor(
    public idServidumbre: string = null,
    public podaconRiesgo: boolean = null,
    public podasinRiesgo: boolean = null,
    public cantArboles: number = null,
    public obsPoda: string = null,
    public NoRequierePoda: boolean = null,
    public obsServidumbre: string = null,
    public noAplica: boolean = null,
    public invasion: boolean = null,
    public pasoMT: boolean = null,
    public pasoBT: boolean = null
  ) {}
}