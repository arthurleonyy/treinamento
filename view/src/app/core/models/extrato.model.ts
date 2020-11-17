import { Conta } from '../dtos/conta.dto';

export class Extrato{

  tipoOperacao: string;
  diaTransacao: Date;
  conta: Conta;

  constructor(param: any){
    this.tipoOperacao = param.tipoOperacao;
    this.diaTransacao = param.diaTransacao;
    this.conta.id = param.conta.id;
    this.conta.agencia = param.conta.agencia;
    this.conta.numeroConta = param.conta.numeroConta;
    this.conta.saldo = param.conta.saldo;
    this.conta.cliente = param.conta.cliente;
  }

}
