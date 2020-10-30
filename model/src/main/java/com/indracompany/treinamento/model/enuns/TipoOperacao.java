package com.indracompany.treinamento.model.enuns;


public enum TipoOperacao {
	DEPOSITO("Deposito"), SAQUE("Saque"), TRANSFERENCIAORIGEM("Transferênciaorigem"),TRANSFERENCIADESTINO("Transferênciadestino");
	
	private String descricao;
	
	TipoOperacao(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

}
