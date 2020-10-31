package com.indracompany.treinamento.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.OperacaoFinanceira;
import com.indracompany.treinamento.model.repository.OperacaoFinanceiraRepository;

@Service
public class ExtratoService extends GenericCrudService<OperacaoFinanceira, Long, OperacaoFinanceiraRepository>{

	@Autowired
	private OperacaoFinanceiraRepository extratoRepository;
	
	@Autowired
	private ContaService contaService;

	
	public List<OperacaoFinanceira> consultarPorAgenciaENumeroConta(String agencia, String numeroConta) {
		Conta conta = this.contaService.carregarPorAgenciaENumeroConta(agencia, numeroConta);
		return extratoRepository.findByContaOrderByDataHoraOperacaoDesc(conta);
	}
	
}
