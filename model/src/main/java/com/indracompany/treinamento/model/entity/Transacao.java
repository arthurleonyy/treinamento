package com.indracompany.treinamento.model.entity;





import java.util.Calendar;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;



import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity 
@Table(name = "Transacoes") 
@EqualsAndHashCode(callSuper = true) 
public class Transacao extends GenericEntity<Long> {
	
	
	private static final long serialVersionUID = -5024310854515940945L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column
	private Calendar data;
	
	@Column(nullable = false)
	private String descricao;
	
	@Column(nullable = false)
	private Double valor;
	
	@ManyToOne
	@JoinColumn(name = "fk_conta_id", nullable = false)
	private Conta conta;
	
	
	
	
}
