package com.indracompany.treinamento.model.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Calendar;
import lombok.Data;

@Data
public class MovimentacaoContaDTO implements Serializable {

  private static final long serialVersionUID = 3712971882687901729L;

  private Long id;

  private String historicoMovimentacao;

  private Calendar dataMovimentacao;

  private BigDecimal valorMovimentacao;

  private ContaDTO conta;

}
