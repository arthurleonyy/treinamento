package com.indracompany.treinamento.model.entity;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.indracompany.treinamento.model.entity.enums.TipoOperacaoFinanceira;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "operacoes_financeiras")
@Data
@EqualsAndHashCode(callSuper = true)
public class OperacaoFinanceira extends GenericEntity<Long> {

  private static final long serialVersionUID = 7713070352574093032L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "cod_op_bancaria", nullable = false)
  @Enumerated
  private TipoOperacaoFinanceira tipoOperacaoFinanceira;

  @Column(name = "saldo_antes_op")
  private Double saldoAntesOperacao;

  @Column(name = "valor_operacao")
  private Double valorOperacao;

  @Column(name = "saldo_apos_op")
  private Double saldoAposOperacao;

  @Column(name = "data_hora_op")
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss", locale = "pt-BR", timezone = "Brazil/East")
  private Instant dataHoraOperacao;

  @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "fk_conta_id", nullable = false)
  private Conta conta;

}
