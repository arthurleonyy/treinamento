package com.indracompany.treinamento.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.repository.ExtratoRepository;

@Service
public class ExtratoService  extends GenericCrudService<Extrato, Long, ExtratoRepository>{

	@Autowired
	private ExtratoRepository er; 
	
	@Autowired
	private ContaService contaservice;
	
	public List<Extrato> visualizarExtratos(String agencia , String numeroConta) {
		Conta conta = contaservice.carregarContaPorNumero(agencia, numeroConta);
		if(conta== null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INEXISTENTE);
		}
		List<Extrato> extratos = er.findByConta(conta);
		return extratos;
		
		
	}
}
