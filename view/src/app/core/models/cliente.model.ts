
export class Cliente{
    
    id?: number;
    nome: string;
    cpf: string;
    email: string;
    ativo: boolean;
    observacoes: string;
 
    constructor(param: any){
        this.id = param.id;
        this.nome = param.nome;
        this.cpf = param.cpf;
        this.email = param.email;
        this.ativo = param.ativo;
        this.observacoes = param.observacoes;
    }
}