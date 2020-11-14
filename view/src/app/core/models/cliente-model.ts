export class Cliente{
    nome: string;
    cpf: string;
    email: number;

    constructor(param: any) {
        this.nome = param.nome;
        this.cpf = param.cpf;
        this.email = param.email;
    }
}