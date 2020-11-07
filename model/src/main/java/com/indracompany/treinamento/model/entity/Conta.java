package com.indracompany.treinamento.model.entity;

import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Digits;
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

  @Column(name = "num_agencia", length = 10, nullable = false)
  private String numeroAgencia;

  @Column(name = "num_conta", length = 15, nullable = false)
  private String numeroConta;

  @Digits(integer = 11, fraction = 2)
  @Column(name = "vlr_saldo", nullable = false)
  private BigDecimal saldo;

  @ManyToOne
  @JoinColumn(name = "fk_cliente_id", nullable = false)
  private Cliente cliente;

}
