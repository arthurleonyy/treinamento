export class Transferencia{

  agenciaDestino: string;
  agenciaOrigem: string;
  numeroContaDestino: string;
  numeroContaOrigem: string;
  valor: number;

  constructor(obj: any){
      this.agenciaDestino     = obj.agenciaDestino;
      this.agenciaOrigem      = obj.agenciaOrigem;
      this.numeroContaDestino = obj.numeroContaDestino;
      this.numeroContaOrigem  = obj.numeroContaOrigem;
      this.valor              = obj.valor;
  }

}
