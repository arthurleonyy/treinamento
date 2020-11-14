export class Transferencia {

    agenciaOrigem: string;
    agenciaDestino: string;
    numeroContaOrigem: string;
    numeroContaDestino: string;
    valor: number;

    constructor(param: any) {
        this.agenciaOrigem = param.agenciaOrigem;
        this.agenciaDestino = param.agenciaDestino;
        this.numeroContaOrigem = param.numeroContaOrigem;
        this.numeroContaDestino = param.numeroContaDestino;
        this.valor = param.valor;
    }
}
