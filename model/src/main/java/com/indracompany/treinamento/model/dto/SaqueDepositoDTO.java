package com.indracompany.treinamento.model.dto;
/**
 * @author Efmendes
 */

import java.io.Serializable;

import lombok.Data;

@Data
public class SaqueDepositoDTO implements Serializable{

	private static final long serialVersionUID = 896251423328585736L;
	
	private String agencia;
	private String numeroConta;
	private double valor;

}
