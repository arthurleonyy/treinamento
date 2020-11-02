package com.indracompany.treinamento.model.entity;

/**
 * @author rhamon
 */

public enum TipoOperacao {

	SAQUE("saque"), TRANSFERENCIA("transferencia"), DEPOSITO("deposito");

	private String descricao;

	TipoOperacao(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {

		return descricao;
	}
}
