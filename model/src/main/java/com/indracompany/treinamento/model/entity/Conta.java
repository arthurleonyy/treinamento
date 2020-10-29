package com.indracompany.treinamento.model.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "contas")
@EqualsAndHashCode(callSuper = true)
public class Conta extends GenericEntity<Long>{
	
	private static final long serialVersionUID = 7525931563943544634L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 10, nullable = false)
	private String agencia;
	
	@Column(name = "num_conta", length = 15, nullable = false)
	private String numeroConta;
	
	@ManyToOne
	@JoinColumn(name = "fk_cliente_id", nullable = false)
	private Cliente cliente;
	
	private double saldo;

}
