package com.indracompany.treinamento.model.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import lombok.Data;

@Data
public class ContaDTO implements Serializable {

  private static final long serialVersionUID = -2232445477540966635L;

  private Long id;

  private String numeroAgencia;

  private String numeroConta;

  private BigDecimal saldo;

  private ClienteDTO cliente;

}
