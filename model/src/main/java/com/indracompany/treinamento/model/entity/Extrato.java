package com.indracompany.treinamento.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "extratos")
public class Extrato extends GenericEntity<Long> {

	private static final long serialVersionUID = -740766305571711645L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "saldo_anterior")
	private double saldoAnterior;
	
	@Column(name = "saldo_atual")
	private double saldoAtual;
	
	@Column(name = "tipo_transacao")
	@Enumerated(EnumType.STRING)
	private TipoTransacao tipoTransacao;
	
	@Column(name = "data_transacao")
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
	private LocalDateTime data;
	
	@Column(name = "valor")
	private double valor;
	
	@JoinColumn(name = "fk_conta_id")
	private Conta conta;
	
}
