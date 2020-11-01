package com.indracompany.treinamento.model.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
	
	@ManyToOne
	@JoinColumn(name = "fk_conta_id")
	private Conta conta;
	
	@Column(name = "operacao", length = 100, nullable = false)
	@Enumerated(EnumType.STRING)
	private OperacaoEnum operacao;
	
	@Column(name = "valor", nullable = false)
	private BigDecimal valor;
	
	@Column(name = "cod_operacao", nullable = false)
	private String codOperacao;
	
	@Column(name = "descricao", length = 200, nullable = false)
	private String descricao;
	
	@Column(name = "data", nullable = false)
	private LocalDateTime data;
	
}
