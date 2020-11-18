import { Conta } from './conta.model';

export class DepositarSacarDTO {

  conta: Conta;
  valor: number;

  constructor(param: any) {
    this.conta = new Conta(param.agencia, param.numeroConta);
    this.valor = param.valor;
  }
}

export class TransferirDTO {

  contaOrigem: Conta;
  contaDestino: Conta;
  valor: number;

  constructor(param: any) {
    this.contaOrigem = new Conta(param.agenciaOrigem, param.numeroContaOrigem);
    this.contaDestino = new Conta(param.agenciaDestino, param.numeroContaDestino);
    this.valor = param.valor;
  }

}
