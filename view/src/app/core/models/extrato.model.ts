import { Conta } from './conta.model';

export class Extrato{

    id?: number;
    conta: Conta;
    dataOperacao: string;
    detalheOperacao: string;
    operacao: string;
    valorAnterior: number;
    valorAtual: number;
    valorOperacao: number;

    constructor(param: any){

        this.id = param.id;
        this.conta = param.conta;
        this.dataOperacao = param.dataOperacao;
        this.detalheOperacao = param.detalheOperacao;
        this.operacao = param.operacao;
        this.valorAnterior = param.valorAnterior;
        this.valorAtual = param.valorAtual;
        this.valorOperacao = param.valorOperacao;

    }
}