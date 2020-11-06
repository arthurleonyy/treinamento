package com.indracompany.treinamento.model.entity.enums;

public enum TransacaoEnum {
		
		SAQUE("SAQUE"),
		DEPOSITO("DEPOSITO"),
		TRANSFERENCIA("TRANSFERENCIA");
		
		private String descricao;
		

		TransacaoEnum(String descricao) {
		     this.descricao = descricao;
		  }
		  public String getDescricao() {
			     return descricao;
			  }
	
}
