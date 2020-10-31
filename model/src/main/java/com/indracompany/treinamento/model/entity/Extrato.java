package com.indracompany.treinamento.model.entity;

import java.time.LocalDateTime;

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
	
	@Column(nullable = false)
	private Long contaId;
	
	@Column(length = 10, nullable = false)
	private String agencia;
	
	@Column(length = 10, nullable = false)
	private String numeroConta;
	
	@Column(name = "operacao", length = 100, nullable = false)
	private String operacao;
	
	//@Column(name = "cod_operacao", length = 20, nullable = false)
	//private Long cod_operacao;	
	
	@Column(name = "valor", nullable = false)
	private double valor;
	
	@Column(name = "data", nullable = false)
	private LocalDateTime data;
	
}
