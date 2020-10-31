package com.indracompany.treinamento.model.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
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
	LocalDateTime dataHora = LocalDateTime.now();
	
	@Autowired
	private ExtratoRepository extratoRepository;
	
	@Autowired
	private ClienteService clienteService;

	public void realizarOperacao(Conta conta, double valor, OperacaoEnum operacao) {
		Extrato extrato = new Extrato();
		extrato.setValor(valor);
		extrato.setConta(conta);
		extrato.setOperacao(operacao);
		extrato.setData(dataHora);
		this.salvar(extrato);
	}

	
	public List<Extrato> buscarPorAgenciaConta (String agencia, String conta) {
		List<Extrato> extrato = extratoRepository.findByAgenciaAndNumeroConta(agencia, conta);
		return extrato;
	}
	
}
