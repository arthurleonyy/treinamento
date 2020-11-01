package com.indracompany.treinamento.model.dto;

import java.io.Serializable;
import java.math.BigDecimal;

import lombok.Data;

@Data
public class TransferenciaBancariaDTO implements Serializable{

	
	private static final long serialVersionUID = 7198071248368049141L;
	
	private String agenciaOrigem;
	private String numeroContaOrigem;
	private String agenciaDestino;
	private String numeroContaDestino;
	private BigDecimal valor;

}
