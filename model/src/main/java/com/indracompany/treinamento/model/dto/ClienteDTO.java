package com.indracompany.treinamento.model.dto;

import java.io.Serializable;
import lombok.Data;

@Data
public class ClienteDTO implements Serializable {

  private static final long serialVersionUID = 4098289884673995088L;

  private Long id;

  private String nome;

  private String cpf;

  private String email;

  private boolean ativo;

}
