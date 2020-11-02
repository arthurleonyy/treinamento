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
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.indracompany.treinamento.model.entity.enums.TransacaoEnum;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "Extrato")	
public class Extrato extends GenericEntity<Long>{

	private static final long serialVersionUID = 3223066331897664518L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "fk_conta_id")
	private Conta conta;
	
	@Column(name = "transacao", length = 100, nullable = false)
	@Enumerated(EnumType.STRING)
	private TransacaoEnum transacaoEnum;
	
	@Column(name = "valor", nullable = false)
	private Double valor;
;
	
	@Column(name = "descricao", length = 200, nullable = false)
	private String descricao;
	
	@Column(name = "data", nullable = false)
	private LocalDateTime data;
	
	
	

}
