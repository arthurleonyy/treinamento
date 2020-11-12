package com.indracompany.treinamento.model.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class TransferenciaBancariaDTO implements Serializable{
	private static final long serialVersionUID = 7198071248368049141L;

	private ContaDTO contaOrigem;
	private ContaDTO contaDestino;
	private double valor;

}
