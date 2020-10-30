package com.indracompany.treinamento.model.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.MovimentoConta;
import com.indracompany.treinamento.model.entity.enums.TransacaoEnum;
import com.indracompany.treinamento.model.repository.MovimentoContaRepository;

@Service
public class MovimentoContaService  extends GenericCrudService<MovimentoConta, Long, MovimentoContaRepository> {
	
	@Autowired
	private MovimentoContaRepository movContaRepository;
	
	@Autowired
	private ContaService contaService;
	
	@Autowired
	private ClienteService clienteService;
	
	
	
	public  void incluirMovimento(Conta conta,  double valor,TransacaoEnum transacao) {
		
		MovimentoConta MovimentoConta = new MovimentoConta();
		MovimentoConta.setTransacao(transacao);
		MovimentoConta.setValor(valor);
		MovimentoConta.setDate(Instant.now());
		MovimentoConta.setContaId(conta);
		this.salvar(MovimentoConta);
	

	}
	public List<MovimentoConta> relatorioExtrato() {
			
		return    Lists.newArrayList(movContaRepository.findAll());
	}
			
	public List<MovimentoConta> obterMovimentoConta(Long contaId) {
		List<MovimentoConta> movConta = movContaRepository.findByContaId(contaId);
	    
	    	if (movConta != null) {
	    		return movConta;
	    	 }
	  
	    throw new AplicacaoException(ExceptionValidacoes.ALERTA_NENHUM_REGISTRO_ENCONTRADO);
	}
	
	public List<MovimentoConta> consultaMovimentoContaPorAgenciaAndNumeroConta(String agencia, String numeroConta) {
			
			return movContaRepository.findByAgenciaAndNumeroConta(agencia, numeroConta);
		    
	
	}
	
  
   
  
}
