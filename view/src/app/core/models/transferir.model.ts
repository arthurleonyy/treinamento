export class Transferir {
   agenciaOrigem: String;
   agenciaDestino: String;
   numeroContaOrigem: String;
   numeroContaDestino: String;
   valor: number;

   constructor(param: any){
    
    this.agenciaDestino = param.agenciaDestino;
    this.agenciaOrigem = param.agenciaOrigem;
    this.numeroContaDestino = param.numeroContaDestino;
    this.numeroContaOrigem = param.numeroContaOrigem;
    this.valor = param.valor; 

   }



}
