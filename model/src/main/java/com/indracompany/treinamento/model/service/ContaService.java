package com.indracompany.treinamento.model.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.entity.enumeration.OperacaoEnum;
import com.indracompany.treinamento.model.repository.ContaRepository;
import com.indracompany.treinamento.model.repository.ExtratoRepository;

@Service
public class ContaService extends GenericCrudService<Conta, Long, ContaRepository>{

	@Autowired
	private ContaRepository contaRepository;
	
	@Autowired
	private ExtratoRepository extratoRepository;
	
	@Autowired
	private ClienteService clienteService;
	
	
	public double consultarSaldo(String agencia, String numeroConta) {
		Conta conta = this.carregarContaPorNumero(agencia, numeroConta);
		return conta.getSaldo();
	}
	
	public void saque(Conta conta, double valor ) {
		if (conta.getSaldo() < valor) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_CONTA_INSUFICIENTE);
		}
		conta.setSaldo(conta.getSaldo() - valor);
		this.salvar(conta);
		
		extratoRepository.save(preencherExtrato(conta, OperacaoEnum.SAQUE));
	}
	
	public void deposito(Conta conta, double valor) {
		conta.setSaldo(conta.getSaldo() + valor);
		this.salvar(conta);
	
		extratoRepository.save(preencherExtrato(conta, OperacaoEnum.DEPOSITO));
	}
	
	@Transactional(rollbackFor = Exception.class)
	public void transferencia (Conta contaOrigem, Conta contaDestino, double valor) {
		this.saqueTransferencia(contaOrigem, valor);
		this.depositoTransferencia(contaDestino, valor);
		
		extratoRepository.save(preencherExtrato(contaOrigem, OperacaoEnum.TRANSFERENCIA));
		
		extratoRepository.save(preencherExtrato(contaDestino, OperacaoEnum.TRANSFERENCIA));
	}
	
	public void saqueTransferencia(Conta conta, double valor ) {
		if (conta.getSaldo() < valor) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_CONTA_INSUFICIENTE);
		}
		conta.setSaldo(conta.getSaldo() - valor);
		this.salvar(conta);
	}
	
	public void depositoTransferencia(Conta conta, double valor) {
		conta.setSaldo(conta.getSaldo() + valor);
		this.salvar(conta);
	}
	
	public Conta carregarContaPorNumero(String agencia, String numeroConta) {
		Conta conta = repository.findByAgenciaAndNumeroConta(agencia, numeroConta);
		if (conta == null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INEXISTENTE);
		}
		return conta;
	}
	
	public List<Conta> obterContasDoCliente(String cpf){
		Cliente cli = clienteService.buscarClientePorCpf(cpf);
		if (cli != null) {
			return contaRepository.findByCliente(cli);
		}
		return null;
	}
	
	private  Extrato preencherExtrato(Conta conta, OperacaoEnum operacao) {
		Extrato extrato = new Extrato();
		extrato.setDataHora(LocalDateTime.now());
		extrato.setOperacao(operacao);
		extrato.setConta(conta);
		
		return extrato;
	}
}
