export class Conta {

    agencia: string;
    numeroConta: string;
    valor: number;

    constructor(param: any) {
        this.agencia = param.agencia;
        this.numeroConta = param.numeroConta;
        this.valor = param.valor;
    }
}

export class ContaTransferencia{

    numeroContaOrigem:  string;
    numeroContaDestino: string;
    agenciaOrigem:      string;
    agenciaDestino:     string;
    valor:              number;

    constructor(param: any) {
        this.numeroContaOrigem = param.numeroContaOrigem;
        this.numeroContaDestino = param.numeroContaDestino;
        this.agenciaOrigem = param.agenciaOrigem;
        this.agenciaDestino = param.agenciaDestino;
        this.valor = param.valor;
    }
}

export class ContaSaldo {
    agencia: string;
    numeroConta: string;

    constructor(param: any) {
        this.agencia = param.agencia;
        this.numeroConta = param.numeroConta;
    }
}

export interface RespondeSaldo{
    
}
