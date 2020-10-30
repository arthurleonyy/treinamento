package com.indracompany.treinamento.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Transacao;
import com.indracompany.treinamento.model.enuns.TipoOperacao;
import com.indracompany.treinamento.model.repository.TransacaoRepository;

@Service
public class TransacaoService {

	@Autowired
	private TransacaoRepository transacaoRepository;

	@Autowired
	private ContaService contaService;

	public List<Transacao> gerar(Conta conta, TipoOperacao tipo, Double valor) {
		return gerar(conta, tipo, valor);

	}

	public List<Transacao> gerarExtratosDaConta(String agencia, String numeroConta) {

		Conta conta = contaService.carregarContaPorNumero(agencia, numeroConta);
		if (conta != null) {
			return transacaoRepository.findByConta(conta);
		}
		return null;
	}
}
