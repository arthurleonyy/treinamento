package com.indracompany.treinamento.enums;

import lombok.Getter;

@Getter
public enum OrigemMensagemEnum {

  SAQUE(1L, "Saque"), DEPOSITO(2L, "Deposito"), TRANFERENCIA(3L, "Transferencia"), SALDO(4L, "Saldo");

  private Long cod;
  private String descricao;

  private OrigemMensagemEnum(Long cod, String descricao) {
    this.cod = cod;
    this.descricao = descricao;
  }

}
