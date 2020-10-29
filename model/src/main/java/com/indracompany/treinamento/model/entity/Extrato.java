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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.indracompany.treinamento.model.entity.enumeration.OperacaoEnum;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "extrato")
@EqualsAndHashCode(callSuper = true)
public class Extrato extends GenericEntity<Long> {

	private static final long serialVersionUID = 3223066331897664518L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "operacao")
	@Enumerated(EnumType.STRING)
	private OperacaoEnum operacao;
	
	
	@Column(name = "data_hora")
	private LocalDateTime dataHora;
	
	@ManyToOne
    @JoinColumn(name="conta_id", nullable=false)
	@JsonIgnore
    private Conta conta;
	
}
