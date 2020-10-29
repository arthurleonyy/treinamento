package com.indracompany.treinamento.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.dto.ExtratoDTO;
import com.indracompany.treinamento.model.dto.OperacaoDTO;
import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.repository.ExtratoRepository;
import com.indracompany.treinamento.util.Funcao;

@Service
public class ExtratoService {

	@Autowired
	ExtratoRepository extratoRepository;

	@Autowired
	ContaService contaService;
	
	public List<Extrato> consultarExtrato(String agencia, String numeroConta) {
		contaService.carregarContaPorNumero(agencia, numeroConta);
		List<Extrato> operacoes = extratoRepository.findByContaAgenciaAndContaNumeroContaOrderByDataHoraAsc(agencia, numeroConta);
		
		
		if (operacoes == null || operacoes.size() == 0) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_EXTRATO_INEXISTENTE);
		}
	
		return operacoes;
	}

	public List<ExtratoDTO> consultarExtratoAgrupadoPorData(String agencia, String numeroConta) {
		List<ExtratoDTO> extratos = new ArrayList<ExtratoDTO>();
		ExtratoDTO extratoDTO = null;

		String data = null;
		String dataAnterior = null;
		List<OperacaoDTO> operacoesDTO = null;
		List<Extrato> operacoes = extratoRepository.findByContaAgenciaAndContaNumeroContaOrderByDataHoraAsc(agencia,
				numeroConta);

		for (Extrato extrato : operacoes) {
			data = Funcao.localDateTimeToStrDate(extrato.getDataHora());

			if (dataAnterior == null) {
				extratoDTO = new ExtratoDTO();
				extratoDTO.setDataHora(data);

				OperacaoDTO operacao = new OperacaoDTO();
				operacao.setNome(extrato.getOperacao().name());
				operacao.setHora(Funcao.localDateTimeToStrTime(extrato.getDataHora()));

				operacoesDTO = new ArrayList<OperacaoDTO>();
				operacoesDTO.add(operacao);

				dataAnterior = data;
			} else if (data.equals(dataAnterior)) {
				OperacaoDTO operacao = new OperacaoDTO();
				operacao.setNome(extrato.getOperacao().name());
				operacao.setHora(Funcao.localDateTimeToStrTime(extrato.getDataHora()));

				operacoesDTO.add(operacao);

				dataAnterior = data;
			} else {
				extratoDTO.setOperacoes(operacoesDTO);
				extratos.add(extratoDTO);

				extratoDTO = new ExtratoDTO();
				extratoDTO.setDataHora(data);

				OperacaoDTO operacao = new OperacaoDTO();
				operacao.setNome(extrato.getOperacao().name());
				operacao.setHora(Funcao.localDateTimeToStrTime(extrato.getDataHora()));

				operacoesDTO = new ArrayList<OperacaoDTO>();
				operacoesDTO.add(operacao);

				dataAnterior = data;
			}
		}
		
		if (data != null) {
			extratoDTO.setOperacoes(operacoesDTO);
			extratos.add(extratoDTO);
		}

		return extratos;
	}

	

}
