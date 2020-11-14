package com.indracompany.treinamento.model.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Extrato;
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
	
	@Autowired
	private MovimentoContaService movContaService;
	
	
	public double consultarSaldo(String agencia, String numeroConta) {
		if(agencia.isEmpty() || numeroConta.isEmpty()) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CAMPOS_VAZIOS);	
		}
		
		Conta conta = this.carregarContaPorNumero(agencia, numeroConta);
		if(conta == null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INEXISTENTE);
		}
		return conta.getSaldo();
	}
	@Transactional(rollbackFor = Exception.class)
	public void saque(Conta conta, double valor) {

		if (conta.getSaldo() < valor || valor <= 0) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_CONTA_INSUFICIENTE);
		}
		conta.setSaldo(conta.getSaldo() - valor);
		this.salvar(conta);

		Extrato extrato = new Extrato();
		extrato.setConta(conta);
		extrato.setDiaTransacao(new Date());
		extrato.setTipoOperacao("Saque");
		extratoRepository.save(extrato);
		

		}

	@Transactional(rollbackFor = Exception.class)
	public void deposito(Conta conta, double valor) {

		if(valor <= 0) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_VALOR_NEGATIVO);
		}
		conta.setSaldo(conta.getSaldo() + valor);
		this.salvar(conta);
		Extrato extrato = new Extrato();
		extrato.setConta(conta);
		extrato.setDiaTransacao(new Date());
		extrato.setTipoOperacao("Deposito");
		extratoRepository.save(extrato);

	}
	
	@Transactional(rollbackFor = Exception.class)
	public void transferencia (Conta contaOrigem, Conta contaDestino, double valor) {
		
		if(contaOrigem == null || contaDestino == null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INEXISTENTE);
		}

		if(valor <= 0) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_VALOR_NEGATIVO);
		}
		
		if(valor > contaOrigem.getSaldo()) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_CONTA_INSUFICIENTE);
		}
		
		this.saque(contaOrigem, valor);
		this.deposito(contaDestino, valor);
		Extrato extrato = new Extrato();
		extrato.setConta(contaOrigem);
		extrato.setDiaTransacao(new Date());
		extrato.setTipoOperacao("Transferencia");
		extratoRepository.save(extrato);
	

	}
	
	public Conta carregarContaPorNumero(String agencia, String numeroConta) {
		Conta conta = contaRepository.findByAgenciaAndNumeroConta(agencia, numeroConta);
		if (conta == null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INEXISTENTE);
		}
		return conta;
	}
	
	public List<Conta> obterContasDoCliente(String cpf){
		Cliente cli = clienteService.buscarCpf(cpf);
		if (cli != null) {
			return contaRepository.findByCliente(cli);
		}
		return null;
	}
}
