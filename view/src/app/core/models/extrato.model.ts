export class Extrato {

    agencia: string;
    numeroConta: string;

    constructor(param: any) {
        this.agencia = param.agencia;
        this.numeroConta = param.numeroConta;
    }
}
