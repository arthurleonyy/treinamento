package com.indracompany.treinamento.model.entity;


import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Id;


import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "extrato")
@EqualsAndHashCode(callSuper = true)
public class Extrato extends GenericEntity<Long>{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2104093528731681612L;


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;


	private double valor;
	
	
	@Column(nullable=false)
	@Enumerated(EnumType.STRING)
	private TipoOperacao tipoOperacao;

	@Column(name = "data", length = 10, nullable = false)
	private Instant data;

	
	@ManyToOne
	@JoinColumn(name = "fk_conta_id", nullable = false)
	private Conta conta;

}
