export class Transferencia {

    agenciaDestino: string;
    agenciaOrigem: string;
    numeroContaDestino: string;
    numeroContaOrigem: string;
    valor: number;

    constructor(param: any) {
        this.agenciaOrigem = param.agenciaOrigem;
        this.numeroContaOrigem = param.numeroContaOrigem;
        this.agenciaDestino = param.agenciaDestino;
        this.numeroContaDestino = param.numeroContaDestino;
        this.valor = param.valor;
    }
}
