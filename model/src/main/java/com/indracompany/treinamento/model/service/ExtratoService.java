package com.indracompany.treinamento.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.repository.ContaRepository;
import com.indracompany.treinamento.model.repository.ExtratoRepository;

@Service
public class ExtratoService extends GenericCrudService<Extrato, Long, ExtratoRepository> {

	@Autowired
	private ExtratoRepository extratoRepository;
	
	@Autowired
	private ContaService contaService;

	public List<Extrato> findByContaAgenciaAndContaNumeroConta(String agencia, String numeroConta) {
		contaService.carregarContaPorNumero(agencia, numeroConta);
		List<Extrato> operacoes = extratoRepository.findByContaAgenciaAndContaNumeroContaOrderByDataHoraAsc(agencia, numeroConta);
	
		
		return operacoes;
	}
	

	
}
