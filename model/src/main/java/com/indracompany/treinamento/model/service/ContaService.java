package com.indracompany.treinamento.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.enums.TransacaoEnum;
import com.indracompany.treinamento.model.repository.ContaRepository;

@Service
public class ContaService extends GenericCrudService<Conta, Long, ContaRepository>{

	@Autowired
	private ContaRepository contaRepository;
	
	@Autowired
	private ClienteService clienteService;
	
	@Autowired
	private MovimentoContaService movContaService;
	
	
	public double consultarSaldo(String agencia, String numeroConta) {
		Conta conta = this.carregarContaPorNumero(agencia, numeroConta);
		return conta.getSaldo();
	}
	@Transactional(rollbackFor = Exception.class)
	public void saque(Conta conta, double valor) {
		TransacaoEnum transacao = TransacaoEnum.SAQUE;
		if (conta.getSaldo() < valor) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_CONTA_INSUFICIENTE);
		}
		conta.setSaldo(conta.getSaldo() - valor);
		this.salvar(conta);
		
		movContaService.incluirMovimento(conta, (-valor), transacao);
	}
	@Transactional(rollbackFor = Exception.class)
	public void deposito(Conta conta, double valor) {
		TransacaoEnum transacao = TransacaoEnum.DEPOSITO;
		
		conta.setSaldo(conta.getSaldo() + valor);
		this.salvar(conta);
		
		movContaService.incluirMovimento(conta, valor, transacao);
	}
	
	@Transactional(rollbackFor = Exception.class)
	public void transferencia (Conta contaOrigem, Conta contaDestino, double valor) {
		
		TransacaoEnum transacao = TransacaoEnum.TRANSFERENCIA;
		
		//Transação de saída
		if (contaOrigem.getSaldo() < valor) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_CONTA_INSUFICIENTE);
		}	
		contaOrigem.setSaldo(contaOrigem.getSaldo() - valor);
		this.salvar(contaOrigem);
		
		movContaService.incluirMovimento( contaOrigem  ,(-valor),transacao);
		
		//Transferênica de entrada
		contaDestino.setSaldo(contaDestino.getSaldo() + valor);
		this.salvar(contaDestino);
		
		movContaService.incluirMovimento(contaDestino, valor, transacao);
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
