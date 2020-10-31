package com.indracompany.treinamento.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.indracompany.treinamento.model.listener.ExtratoListener;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@EntityListeners(ExtratoListener.class)
@Table(name = "tb_extrato")
@EqualsAndHashCode(callSuper = true)
public class Extrato extends GenericEntity<Long>{
	 
	private static final long serialVersionUID = 3223066331897664518L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	private LocalDateTime dataHora;
	
	@ManyToOne
	@JoinColumn(name = "fk_conta_id", nullable = false)
	private Conta conta;
	
	private Double valor;
	
	private String tipo;
	
	private String descricao;

	public Extrato(Conta conta, String tipo, String descricao, Double valor) {
		this.conta = conta;
		this.valor = valor;
		this.tipo = tipo;
		this.descricao = descricao;
	}

	
		
}
