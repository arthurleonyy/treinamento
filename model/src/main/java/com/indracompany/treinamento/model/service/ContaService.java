package com.indracompany.treinamento.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.enums.OperacaoExtrato;
import com.indracompany.treinamento.model.repository.ContaRepository;

@Service
public class ContaService extends GenericCrudService<Conta, Long, ContaRepository>{

	@Autowired
	private ContaRepository contaRepository;
	
	@Autowired
	private ClienteService clienteService;
	
	@Autowired
	private ExtratoService extratoService;
	
	public double consultarSaldo(String agencia, String numeroConta) {
		Conta conta = this.carregarContaPorNumero(agencia, numeroConta);
		return conta.getSaldo();
	}
	
	@Transactional(rollbackFor = Exception.class)
	public void saque(Conta conta, double valor, OperacaoExtrato operacao) {
		
		if (conta.getSaldo() < valor) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_CONTA_INSUFICIENTE);
		}
		
		conta.setSaldo(conta.getSaldo() - valor);
		this.salvar(conta);
		
		if(operacao.getDescricao().equals("Transferencia")) {
			
			extratoService.gerarExtrato(conta, operacao, (conta.getSaldo()+valor), valor, 
					(conta.getSaldo()));
			
		}else if(operacao.getDescricao().equals("Saque")){
			
			extratoService.gerarExtrato(conta, operacao, (conta.getSaldo()+valor), valor, 
					(conta.getSaldo()));
			
		}else {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_OPERACAO_EXTRATO);
		}
	}
	
	@Transactional(rollbackFor = Exception.class)
	public void deposito(Conta conta, double valor, OperacaoExtrato operacao) {
		
		conta.setSaldo(conta.getSaldo() + valor);
		this.salvar(conta);
		
		if(operacao.getDescricao().equals("Transferencia")) {
			
			extratoService.gerarExtrato(conta, operacao, (conta.getSaldo()-valor), valor, 
					(conta.getSaldo()));
			
		}else if(operacao.getDescricao().equals("Deposito")){
			
			extratoService.gerarExtrato(conta, operacao, (conta.getSaldo()-valor), valor, 
					(conta.getSaldo()));
			
		}else {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_OPERACAO_EXTRATO);
		}
	}
	
	@Transactional(rollbackFor = Exception.class)
	public void transferencia (Conta contaOrigem, Conta contaDestino, double valor, OperacaoExtrato operacao) {
		
		this.saque(contaOrigem, valor, operacao);
		this.deposito(contaDestino, valor, operacao);
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
}
