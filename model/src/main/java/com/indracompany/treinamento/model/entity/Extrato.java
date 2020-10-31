package com.indracompany.treinamento.model.entity;

import java.util.Date;

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
@Table(name = "extratos")
@EqualsAndHashCode(callSuper = true)
public class Extrato extends GenericEntity<Long>{

	
	private static final long serialVersionUID = 1036966887302442018L;


	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	 
	@Column(name = "operacao" , nullable = false)
	private String tipoOperacao;
	
	@Column(name="data" , nullable = false)
	private Date diaTransacao;
	
	@ManyToOne
	@JoinColumn(name="fk_conta_id" , nullable = false)
	private Conta conta;

}
