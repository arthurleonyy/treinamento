package com.indracompany.treinamento.model.entity;



import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.indracompany.treinamento.model.enums.OperacaoExtrato;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "extrato")
@EqualsAndHashCode(callSuper = true)
public class Extrato extends GenericEntity<Long> {

	private static final long serialVersionUID = 2601278377459245873L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "fk_conta_id", nullable = false)
	private Conta conta;
	
	@Column(nullable = false)
	private OperacaoExtrato operacao;
	
	@Column(nullable = false)
	private Date dataOperacao;
	
	@Column(nullable = false)
	private Double valorAnterior;
	
	@Column(nullable = false)
	private Double valorOperacao;
	
	@Column(nullable = false)
	private Double valorAtual;

}
