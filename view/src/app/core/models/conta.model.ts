import { SaldoComponent } from './../../modules/conta/pages/saldo/saldo.component';
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

export class ContaTransferir{

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

export class Saldo{


    agencia: string;
    numeroConta: string;
    valor: number;

    constructor(param: any) {
        this.agencia = param.agencia;
        this.numeroConta = param.numeroConta;
        this.valor = param.valor;
    }
}