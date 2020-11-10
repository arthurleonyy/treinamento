export class Transferir {

    agenciaOrigem: string;
    numeroContaOrigem: string;
    numeroContaDestino: string;
    agenciaDestino: string;
    valor: number;

    constructor(param: any) {
        this.agenciaOrigem = param.agenciaOrigem;
        this.agenciaDestino = param.agenciaDestino;
        this.numeroContaDestino = param.numeroContaDestino;
        this.numeroContaOrigem = param.numeroContaOrigem;
        this.valor = param.valor;
    }
}