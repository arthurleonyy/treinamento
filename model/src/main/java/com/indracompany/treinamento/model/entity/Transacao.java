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
@Table(name = "transacoes")
@EqualsAndHashCode(callSuper = true)
public class Transacao extends GenericEntity<Long> {
	
	private static final long serialVersionUID = -8776301842964925840L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "tipo",  nullable = false)
	private String tipo;
	
	@Column(name = "data_hora", nullable = false)
	private String dataHora;
	
	
	@ManyToOne
	@JoinColumn(name = "fk_conta_id", nullable = false)
	private Conta conta;
	
	private double valor;

}
