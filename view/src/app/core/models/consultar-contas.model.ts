export class ConsultarContas {


  agencia: string;
  numeroConta: string;
  cpf: string;



  constructor(param: any) {
    this.agencia = param.agencia;
    this.numeroConta = param.numeroConta;
    this.cpf = param.cpf;

  }


}