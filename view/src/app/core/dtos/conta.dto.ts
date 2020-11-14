export class Conta{
  id: number;
  agencia: string;
  numeroConta: string;
  cliente: {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    ativo: boolean;
    observacoes: string;
  }
  saldo: number;

  constructor(param: any) {
    this.id = param.id;
    this.agencia = param.agencia;
    this.numeroConta = param.numeroConta;
    this.cliente.id = param.cliente.id;
    this.cliente.nome = param.cliente.nome;
    this.cliente.cpf = param.cliente.cpf;
    this.cliente.email = param.cliente.email;
    this.cliente.ativo = param.cliente.ativo;
    this.cliente.observacoes = param.cliente.observacoes;
    this.saldo = param.saldo;
  }
}
