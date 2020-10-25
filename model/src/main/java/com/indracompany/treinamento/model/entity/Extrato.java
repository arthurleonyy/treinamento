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
@Table(name = "extratos")
@EqualsAndHashCode(callSuper = true)
public class Extrato extends GenericEntity<Long>{
	
	private static final long serialVersionUID = 1166911459976971581L;

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
	
	@Column(name = "saldo_anterior")
	private double saldoAnterior;
	
	// Saque ou Depósito, transferência para quem ou de quem
	@Column(name = "operacao")
	private String operacao;
	
	// crédito ou débido
	@Column(name = "tipo")
	private String tipo;
	
	@Column(name = "valor")
	private String valor;
	
	// data
	
	@Column(name = "saldo_pos_movimentacao")
	private double saldoPosMovimentacao;

}
