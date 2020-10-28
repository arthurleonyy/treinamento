package com.indracompany.treinamento.model.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.enumeration.OperacaoExtrato;
import com.indracompany.treinamento.model.repository.ExtratoRepository;

@Service
public class ExtratoService extends GenericCrudService<Extrato, Long, ExtratoRepository> {
	
	@Autowired
	private ExtratoRepository extratoRepository;
	
	@Autowired
	private ContaService contaService;
	
	public void gerarExtrato(Conta conta, OperacaoExtrato operacao, Double saldoAnterior, Double valorOperacao,
			Double saldoAtual) {

		Extrato extrato = new Extrato();
		
		extrato.setConta(conta);
		extrato.setOperacao(operacao);
		extrato.setValorAnterior(saldoAnterior);
		extrato.setValorOperacao(valorOperacao);
		extrato.setValorAtual(saldoAtual);
		extrato.setDataOperacao(new Date(System.currentTimeMillis()));

		this.salvar(extrato);
	}
	
	public List<Extrato> carregarExtratosDaConta(String agencia, String numeroConta){
		Conta conta = contaService.carregarContaPorNumero(agencia, numeroConta);
		if (conta != null) {
			return extratoRepository.findByConta(conta);	
		}
		return null;
	}
	

}
