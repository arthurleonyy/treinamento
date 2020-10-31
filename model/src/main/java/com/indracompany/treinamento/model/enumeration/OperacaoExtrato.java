package com.indracompany.treinamento.model.enumeration;

public enum OperacaoExtrato {
	
	ENTRADA("Entrada"),
    SAIDA("Saida"),
<<<<<<< HEAD
    TRANSFERENCIA("Transferencia"),
    TRANSFERENCIA_SAIDA("Transferencia - Saida"),
    TRANSFERENCIA_ENTRADA("Transferencia - Entrada");
=======
    TRANSFERENCIA("Transferencia");
>>>>>>> 22f78f795b4061ea60aa8ed20d09ab7fe78845cd

    private String descricao;

    OperacaoExtrato(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

}
