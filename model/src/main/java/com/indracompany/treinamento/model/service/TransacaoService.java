package com.indracompany.treinamento.model.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Transacao;
import com.indracompany.treinamento.model.enums.OperacaoExtrato;
import com.indracompany.treinamento.model.repository.TransacaoRepository;
import com.indracompany.treinamento.model.repository.ContaRepository;

@Service
public class TransacaoService extends GenericCrudService<Transacao, Long, TransacaoRepository> {
	
	@Autowired
	private TransacaoRepository transacaoRepository;
	
	@Autowired
	private ContaService contaService;
	
	@Autowired
	private ContaRepository contaRepository;
	
	public void gerarTransacao(Conta conta, OperacaoExtrato operacao, Double saldoAnterior, Double valorOperacao,
			Double saldoAtual) {

		Transacao transacao = new Transacao();
		
		transacao.setConta(conta);
		transacao.setOperacao(operacao);
		transacao.setValorAnterior(saldoAnterior);
		transacao.setValorOperacao(valorOperacao);
		transacao.setValorAtual(saldoAtual);
		transacao.setDataOperacao(new Date(System.currentTimeMillis()));

		this.salvar(transacao);
	}
	
	public List<Transacao> getTransacoesByConta(String agencia, String numeroConta){
		Conta conta = this.contaRepository.findByAgenciaAndNumeroConta(agencia, numeroConta);
		
		if(conta != null) {
			return this.repository.findAllByConta(conta).orElse(null);
		}else {
			return null;
		}
	}
	
	
	

}