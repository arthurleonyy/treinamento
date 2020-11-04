package com.indracompany.treinamento.model.entity;

import java.util.Date;

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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.indracompany.treinamento.model.enuns.TipoDeConta;
import com.indracompany.treinamento.model.enuns.TipoOperacao;

import lombok.Data;

@Data
@Entity
@Table(name = "extrato")
public class Transacao extends GenericEntity<Long> {

	private static final long serialVersionUID = 2601278377459245873L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "fk_conta_id", nullable = false)
	private Conta conta;

	@Temporal(TemporalType.TIMESTAMP) //representa a data e hora juntos//
	private Date data;

	@Enumerated(EnumType.STRING) //Grava o nome do enum no banco de dados//
	private TipoDeConta tipoDeConta;

	@Enumerated(EnumType.STRING)
	private TipoOperacao tipoOperacao;

	private Double valor;

	private String informacoes;

	public Transacao() {

	}

	public Transacao(Date data, TipoDeConta tipoDeConta, TipoOperacao tipoOperacao, Double valor, Conta conta) {
		super();
		this.data = data;
		this.tipoDeConta = tipoDeConta;
		this.tipoOperacao = tipoOperacao;
		this.valor = valor;
		this.conta = conta;
	}
}
