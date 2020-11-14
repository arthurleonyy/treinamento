import { Cliente } from './cliente.model';

export class Conta {

    id?: number
    agencia: string;
    numeroConta: string;
    valor: number;
    saldo: number;
    cliente: Cliente;

    constructor(param: any) {
        this.id = param.id
        this.agencia = param.agencia;
        this.numeroConta = param.numeroConta;
        this.valor = param.valor;
        this.saldo = param.saldo;
        this.cliente = param.cliente;
    }
}
