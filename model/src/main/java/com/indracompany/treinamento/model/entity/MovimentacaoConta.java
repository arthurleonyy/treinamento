package com.indracompany.treinamento.model.entity;

import java.math.BigDecimal;
import java.util.Calendar;
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
import javax.validation.constraints.Digits;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "movimentacoes")
@EqualsAndHashCode(callSuper = true)
public class MovimentacaoConta extends GenericEntity<Long> {

  private static final long serialVersionUID = -804911664895026279L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "ds_movimentacao", nullable = false)
  private String historicoMovimentacao;

  @Temporal(value = TemporalType.TIMESTAMP)
  @Column(name = "dt_movimentacao", nullable = false)
  private Calendar dataMovimentacao = Calendar.getInstance();

  @Digits(integer = 11, fraction = 2)
  @Column(name = "vlr_movimentacao", nullable = false)
  private BigDecimal valorMovimentacao;

  @ManyToOne
  @JoinColumn(name = "fk_conta_id", nullable = false)
  private Conta conta;

}
