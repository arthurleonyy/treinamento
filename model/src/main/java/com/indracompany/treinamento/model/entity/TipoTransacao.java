package com.indracompany.treinamento.model.entity;

public enum TipoTransacao {

	DEPOSITO("Deposito"), SAQUE("Saque"), TRANSFERENCIA("Transferencia");
	
	private String descricao;
	
	private TipoTransacao(String descricao) {
		this.descricao = descricao;
	}
	
	public String getDescricao() {
		return descricao;
	}
}
