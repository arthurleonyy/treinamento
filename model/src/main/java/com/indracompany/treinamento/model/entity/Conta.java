package com.indracompany.treinamento.model.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "contas")
@Data
@EqualsAndHashCode(callSuper = true)
public class Conta extends GenericEntity<Long>{
	
	private static final long serialVersionUID = 1166911459976971581L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 10, 
			nullable = false)
	private String agencia;
	
	@Column(name = "num_conta", 
			length = 15, 
			nullable = false)
	private String numeroConta;
	
	@Column
	private double saldo;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "fk_cliente_id", 
			nullable = false)
	private Cliente cliente;
	
	@JsonIgnore
	@OneToMany(mappedBy = "conta")
	private List<OperacaoFinanceira> extratos = new ArrayList<>();
	
}
