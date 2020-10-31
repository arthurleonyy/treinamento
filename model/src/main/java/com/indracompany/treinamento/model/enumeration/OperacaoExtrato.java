package com.indracompany.treinamento.model.enumeration;

public enum OperacaoExtrato {
	
	ENTRADA("Entrada"),
    SAIDA("Saida"),
    TRANSFERENCIA("Transferencia"),
    TRANSFERENCIA_SAIDA("Transferencia - Saida"),
    TRANSFERENCIA_ENTRADA("Transferencia - Entrada");

    private String descricao;

    OperacaoExtrato(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

}
