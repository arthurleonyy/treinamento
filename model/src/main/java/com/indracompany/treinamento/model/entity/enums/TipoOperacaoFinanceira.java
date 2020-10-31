package com.indracompany.treinamento.model.entity.enums;

import lombok.Getter;

@Getter
public enum TipoOperacaoFinanceira {

	DEPOSITO(1),
	SAQUE(2),
	TRANSFERENCIA(3);
	
	private int codOperacao;
	
	private TipoOperacaoFinanceira(int codOperacao) {
		this.codOperacao = codOperacao;
	}
	
	public static TipoOperacaoFinanceira valueOf(int codOperacao) {
		for(TipoOperacaoFinanceira value : TipoOperacaoFinanceira.values()) {
			if(value.getCodOperacao() == codOperacao) {
				return value;
			}
		}
		throw new IllegalArgumentException("Código de TipoOperacaoFinanceira inválido.");
	}
}
