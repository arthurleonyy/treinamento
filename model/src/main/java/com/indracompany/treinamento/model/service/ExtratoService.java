package com.indracompany.treinamento.model.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.entity.OperacaoEnum;
import com.indracompany.treinamento.model.repository.ContaRepository;
import com.indracompany.treinamento.model.repository.ExtratoRepository;

@Service
public class ExtratoService extends GenericCrudService<Extrato, Long, ExtratoRepository>{
	
	@Autowired
	private ExtratoRepository extratoRepository;
	
	@Autowired
	private ClienteService clienteService;

	public void realizarOperacao(Conta conta, BigDecimal valor, OperacaoEnum operacao, String codOperacao, LocalDateTime dataHora, String descricao) {
		Extrato extrato = new Extrato();
		extrato.setValor(valor);
		extrato.setConta(conta);
		extrato.setOperacao(operacao);
		extrato.setDescricao(descricao);
		extrato.setData(dataHora);
		extrato.setCodOperacao(codOperacao);
		this.salvar(extrato);
	}

	
	public List<Extrato> buscarPorAgenciaConta (String agencia, String conta) {
		List<Extrato> extrato = extratoRepository.findByAgenciaAndNumeroConta(agencia, conta);
		return extrato;
	}
	
	public List<Extrato> buscarPorIntervaloData (String dataInicial, String dataFinal) {
		dataInicial = dataInicial + "T" + "00:00:00";
		dataFinal = dataFinal + "T" + "23:59:59";
		LocalDateTime dataInicio = LocalDateTime.parse(dataInicial);
		LocalDateTime dataFim = LocalDateTime.parse(dataFinal);
		
		if (dataInicio.isAfter(dataFim)) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_DATA_INICIAL_NAO_PODE_SER_DEPOIS_DA_DATA_FINAL);
		}
		List<Extrato> extrato = extratoRepository.findByIntervalDate(dataInicial, dataFinal);
		return extrato;
	}
	
	public List<Extrato> buscarPorContaClienteEData (String agencia, String numeroConta, String dataInicial, String dataFinal) {
		dataInicial = dataInicial + "T" + "00:00:00";
		dataFinal = dataFinal + "T" + "23:59:59";
		LocalDateTime dataInicio = LocalDateTime.parse(dataInicial);
		LocalDateTime dataFim = LocalDateTime.parse(dataFinal);
		
		if (dataInicio.isAfter(dataFim)) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_DATA_INICIAL_NAO_PODE_SER_DEPOIS_DA_DATA_FINAL);
		}
		List<Extrato> extrato = extratoRepository.findByAccountAndIntervalDate(agencia, numeroConta, dataInicial, dataFinal);
		return extrato;
	}
	
	public List<Extrato> buscarExtratoPorCodOperacao (String codOperacao) {
		List<Extrato> extrato = extratoRepository.findByCodOperacao(codOperacao);
		return extrato;
	}
	
	
}
