package com.indracompany.treinamento.model.enumeration;

import lombok.Getter;

@Getter
public enum TipoTransacao {
	
	TRANSFERENCIA("Transferência"),
	DEPOSITO("Deposito"),
	SAQUE("Saque");
	
	private String tipo;

	private TipoTransacao(String tipo) {
		this.tipo = tipo;
	}
	
	
	
}
