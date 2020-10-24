package com.indracompany.treinamento.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "clientes")
@EqualsAndHashCode(callSuper = true)
public class Cliente extends GenericEntity<Long> {
	
	
	private static final long serialVersionUID = -2847865650784407318L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nome")
	private String nome;
	
	@Column(name = "cpf")
	private String cpf;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "ativo")
	private boolean ativo;
	
	@Column(name = "observacoes")
	private String observacoes;
	
	

}