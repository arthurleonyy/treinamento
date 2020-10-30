package com.indracompany.treinamento.model.entity;

public enum TipoConta {

	CONTACORRENTE("conta corrente"), CONTAPOUPANCA("conta poupanca");

	private String descricao;

	private TipoConta(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}

	public static TipoConta parse(String descricao) {
		TipoConta tipoConta = null;
		for (TipoConta tipo : TipoConta.values()) {
			if (tipo.getDescricao() == descricao) {
				tipoConta = tipo;
				break;
			}
		}

		return tipoConta;
	}

}
