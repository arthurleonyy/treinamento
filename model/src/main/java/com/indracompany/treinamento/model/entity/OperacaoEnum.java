package com.indracompany.treinamento.model.entity;

public enum OperacaoEnum {
	SAQUE("SAQUE"),
	DEPOSITO("DEPOSITO"),
	TRANSFERENCIA("TRANSFERENCIA");
	
	private String operacao;

	OperacaoEnum(String operacao) {
		this.operacao = operacao;
	}
	
	public String getOperacao() {
		return operacao;
	}
}
