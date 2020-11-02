package com.indracompany.treinamento.model.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.repository.ExtratoRepository;

@Service
public class ExtratoService extends GenericCrudService<Extrato, Long, ExtratoRepository>{

	@Autowired
	private ContaService contaService;
	
	@Autowired
	private ExtratoRepository extratoRepository;
	
	
	public List<Extrato> consultarExtrato(String agencia, String numeroConta) {
		Conta conta = contaService.carregarContaPorNumero(agencia, numeroConta);		
		if (conta != null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_EXTRATO_INEXISTENTE_PARA_CONTA);
		}
		return extratoRepository.findByConta(conta);
		}	

	public void extratoData(String descricao,Conta conta, Double valor) {
		Date data = new Date();
		
		extratoRepository.salva(data, descricao, conta, valor);		
		
		
	}
}
