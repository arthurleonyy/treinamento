export class Conta {

    agencia: string;
    numeroConta: string;

    agenciaDestino: string;
    agenciaOrigem: string;
    numeroContaDestino: string;
    numeroContaOrigem: string;

    valor: number;

    constructor(param: any) {
        this.agencia = param.agencia;
        this.numeroConta = param.numeroConta;
        this.valor = param.valor;
        this.agenciaOrigem = param.agenciaOrigem;
        this.numeroContaOrigem = param.numeroContaOrigem;
        this.agenciaDestino = param.agenciaDestino;
        this.numeroContaDestino = param.numeroContaDestino;
    }
}
