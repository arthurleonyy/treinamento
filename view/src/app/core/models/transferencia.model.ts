export class Transferencia {

    agenciaOrigem: string;
    numeroContaOrigem: string;
    agenciaDestino: string;
    numeroContaDestino: string;
    valor: number;

    constructor(param: any) {
        this.agenciaOrigem = param.agenciaOrigem;
        this.numeroContaOrigem = param.numeroContaOrigem;
        this.agenciaDestino = param.agenciaDestino;
        this.numeroContaDestino = param.numeroContaDestino;
        this.valor = param.valor;
    }
}
