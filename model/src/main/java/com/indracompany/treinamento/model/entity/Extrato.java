package com.indracompany.treinamento.model.entity;

import java.time.OffsetDateTime;

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

import com.indracompany.treinamento.util.TipoTransacao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@AllArgsConstructor
@Data
@Entity
@Table(name = "extrato")
@EqualsAndHashCode(callSuper = true)
public class Extrato extends GenericEntity<Long> {
	


	private static final long serialVersionUID = 1967630612529956124L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private OffsetDateTime date;
	
	@Column(name = "saldo_anterior")
	private double saldoAnterior;
	
	@Column(name = "valor_transacao", nullable = false)
	private double valorTransacao;
	
	@Column(name = "saldo_atual")
	private double saldoAtual;
	
	@Enumerated(EnumType.STRING)
	private TipoTransacao tipo;
	
	@ManyToOne
	@JoinColumn(name = "fk_conta_id", nullable = false)
	private Conta conta;
	
	public Extrato() {
		
	}
	
	public Extrato(OffsetDateTime date, double saldoAnterior, double valorTransacao, double saldoAtual, TipoTransacao tipo, Conta conta) {
		super();
		this.date = date;
		this.saldoAnterior = saldoAnterior;
		this.valorTransacao = valorTransacao;
		this.saldoAtual = saldoAtual;
		this.tipo = tipo;
		this.conta = conta;
	}
	
}
