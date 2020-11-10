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
