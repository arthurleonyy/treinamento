package com.indracompany.treinamento.model.dto;


import java.io.Serializable;

import lombok.Data;

@Data
public class ContaDTO implements Serializable{
	private static final long serialVersionUID = -6849450153353363580L;
	
	private String agencia;
	private String numeroConta;

}
