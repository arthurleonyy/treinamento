package com.indracompany.treinamento.model.enums;

public enum OperacaoExtrato {
	
	DEPOSITO("Deposito"),
    SAQUE("Saque"),
    TRANSFERENCIA("Transferencia");

    private String descricao;

    OperacaoExtrato(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

}
