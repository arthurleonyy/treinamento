package com.indracompany.treinamento.model.dto;

import java.util.Date;

import org.modelmapper.ModelMapper;

import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Transacao;
import com.indracompany.treinamento.model.enuns.TipoOperacao;

import lombok.Data;


@Data
public class TransacaoDTO {

	
	private Long idTransacao;
	private Conta conta;
	private String informacoes;
	private TipoOperacao tipoOperacao;
	private double valor;
	private Date dataTransacao;


/*public TransacaoDTO(Transacao t) {
	 this.idTransacao = getIdTransacao();
	 this.conta = getConta();
	 this.informacoes = getInformacoes();
	  this.tipoOperacao = getTipoOperacao();*/
	
	public static TransacaoDTO create(Transacao t) {
		ModelMapper modelMapper = new ModelMapper();
		return modelMapper.map(t,TransacaoDTO.class);
		
}

}
