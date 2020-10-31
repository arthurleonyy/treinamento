package com.indracompany.treinamento.model.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Transacao;
import com.indracompany.treinamento.model.repository.TransacaoRepository;

@Service
public class TransacaoService extends GenericCrudService<Transacao, Long, TransacaoRepository>{

	@Autowired
	private ContaService contaService;
	
	@Autowired
	private TransacaoRepository transacaoRepository;
	
	
	public List<Transacao> mostrarTransacoes(String agencia, String numeroConta) {
		Conta conta = contaService.carregarContaPorNumero(agencia, numeroConta);
		return transacaoRepository.findByConta(conta);
	}
	
	public void registroTransacoes(String descriçao, Conta conta, Double valor) {
		Calendar data = Calendar.getInstance();
		transacaoRepository.registarSql(data, descriçao, conta, valor);
	}
	
}
