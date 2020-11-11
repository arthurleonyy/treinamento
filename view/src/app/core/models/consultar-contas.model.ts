export class ConsultarContas {

    cpf: string;
    agencia: string;
    numeroConta: string;

    constructor(param: any) {
        this.cpf = param.cpf;
        this.agencia = param.agencia;
        this.numeroConta = param.numeroConta;
    }
}
