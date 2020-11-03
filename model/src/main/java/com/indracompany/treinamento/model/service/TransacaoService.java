package com.indracompany.treinamento.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Transacao;
import com.indracompany.treinamento.model.repository.TransacaoRepository;

@Service
public class TransacaoService extends GenericCrudService<Transacao, Long, TransacaoRepository>{
	
	@Autowired
	private TransacaoRepository transacaoRepository;
	
	@Autowired
	private ContaService contaService;
	
	
	
	public List<Transacao> ObterTransacoesDaConta(String numeroConta, String agencia){
		Conta con = contaService.carregarContaPorNumero(numeroConta,agencia);
		if (con != null) {
			return transacaoRepository.findByConta(con);
		}
		return null;
	}
}