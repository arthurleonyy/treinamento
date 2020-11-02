package com.indracompany.treinamento.model.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class ExtratoDTO implements Serializable{	
	
	private static final long serialVersionUID = 1L;

	private String agenciaOrigem;
	
	private String agenciaDestino;
	
	private String contaOrigem;
	
	private String contaDestino;
	
	private double valor;
	

}
