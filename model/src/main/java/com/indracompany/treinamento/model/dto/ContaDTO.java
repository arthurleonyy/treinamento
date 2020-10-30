package com.indracompany.treinamento.model.dto;

import lombok.Data;

@Data
public class ContaDTO {

	private Long id;
	
	private String agencia;
	
	private String numeroConta;
	
	private boolean ativa;
	
	private String tipoConta;
	
}
