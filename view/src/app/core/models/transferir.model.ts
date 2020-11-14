export class Transferir{

    agenciaDestino: string;
    agenciaOrigem: string;
    numeroContaDestino: string;
    numeroContaOrigem: string;
    valor: number;

    constructor(param: any) {        

        this.agenciaDestino = param.agenciaDestino;
        this.agenciaOrigem = param.agenciaOrigem;
        this.numeroContaDestino = param.numeroContaDestino;
        this.numeroContaOrigem = param.numeroContaOrigem;
    }
}