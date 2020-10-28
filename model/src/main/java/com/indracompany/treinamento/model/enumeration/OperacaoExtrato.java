package com.indracompany.treinamento.model.enumeration;

public enum OperacaoExtrato {
	
	ENTRADA("Entrada"),
    SAIDA("Saida"),
    TRANSFERENCIA("Transferencia");

    private String descricao;

    OperacaoExtrato(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

}
