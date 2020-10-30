package com.indracompany.treinamento.model.dto;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.util.TipoTransacao;

import lombok.Data;

@Data
public class ExtratoDTO {

	private Conta conta;
	private List<TransacaoDTO> transacoes = new ArrayList<>();

	public ExtratoDTO(Conta conta, List<Extrato> extratos) {

		this.conta = conta;
		this.transacoes = converter(extratos);
	}

	private List<TransacaoDTO> converter(List<Extrato> extratos) {
		return extratos.stream().map(TransacaoDTO::new).collect(Collectors.toList());
	}

}

@Data
class TransacaoDTO {
	private OffsetDateTime date;

	private double saldoAnterior;

	private double valorTransacao;

	private double saldoAtual;

	private TipoTransacao tipo;

	public TransacaoDTO(Extrato extrato) {

		this.date = extrato.getDate();
		this.saldoAnterior = extrato.getSaldoAnterior();
		this.valorTransacao = extrato.getValorTransacao();
		this.saldoAtual = extrato.getSaldoAtual();
		this.tipo = extrato.getTipo();
	}
}