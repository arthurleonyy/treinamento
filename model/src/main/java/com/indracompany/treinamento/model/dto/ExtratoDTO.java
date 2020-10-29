package com.indracompany.treinamento.model.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import com.indracompany.treinamento.model.entity.enumeration.OperacaoEnum;

import lombok.Data;

@Data
public class ExtratoDTO implements Serializable {

	private static final long serialVersionUID = -5124256620021729625L;

	private String dataHora;
	private List<OperacaoDTO> operacoes;

}
