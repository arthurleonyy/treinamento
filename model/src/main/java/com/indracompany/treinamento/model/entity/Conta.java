package com.indracompany.treinamento.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "contas")
@EqualsAndHashCode(callSuper = true)
public class Conta extends GenericEntity<Long> {

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

	@Column(name = "saldo")
	@PositiveOrZero
	private double saldo;

	@NotNull
	@Column(name = "tipoConta")
	private String tipoConta;

	@Column(name = "ativa")
	private Boolean ativa;

	public TipoConta getTipoConta() {
		return TipoConta.parse(this.tipoConta);
	}

	public void setTipoConta(TipoConta tipoConta) {
		this.tipoConta = tipoConta.getDescricao();
	}
}
