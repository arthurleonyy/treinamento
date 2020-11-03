package com.indracompany.treinamento.model.enumeration;

public enum OperacaoExtrato {
	
	ENTRADA("Entrada"),
    SAIDA("Saida"),
<<<<<<< HEAD
    TRANSFERENCIA("Transferencia"),
    TRANSFERENCIA_SAIDA("Transferencia - Saida"),
    TRANSFERENCIA_ENTRADA("Transferencia - Entrada");
=======
<<<<<<< HEAD
    TRANSFERENCIA("Transferencia"),
    TRANSFERENCIA_SAIDA("Transferencia - Saida"),
    TRANSFERENCIA_ENTRADA("Transferencia - Entrada");
=======
    TRANSFERENCIA("Transferencia");
>>>>>>> 22f78f795b4061ea60aa8ed20d09ab7fe78845cd
>>>>>>> 7d797523e6ad2e027548fb5d2d633eaef170ca06

    private String descricao;

    OperacaoExtrato(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

}
