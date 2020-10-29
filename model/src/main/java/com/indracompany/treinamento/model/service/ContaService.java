package com.indracompany.treinamento.model.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Transacao;
import com.indracompany.treinamento.model.repository.ContaRepository;

@Service
public class ContaService extends GenericCrudService<Conta, Long, ContaRepository>{

	@Autowired
	private ContaRepository contaRepository;
	
	@Autowired
	private ClienteService clienteService;
	
	@Autowired
	private TransacaoService transacaoService;

		
	
	public double consultarSaldo(String agencia, String numeroConta) {
		Conta conta = this.carregarContaPorNumero(agencia, numeroConta);
		return conta.getSaldo();
	}
	
	public void saque(Conta conta, double valor) {
		if (conta.getSaldo() < valor) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_CONTA_INSUFICIENTE);
		}
		conta.setSaldo(conta.getSaldo() - valor);
		this.salvar(conta);
		Transacao transacao = new Transacao();
		Date data = new Date();
		SimpleDateFormat formatar = new SimpleDateFormat("dd/MM/yyyy - HH:mm");
		String dataHoraFormatada = formatar.format(data);
		transacao.setDataHora(dataHoraFormatada);
		transacao.setConta(conta);
		transacao.setTipo("saque");
		transacao.setValor(valor);
		transacaoService.salvar(transacao);
	}
	
	public void deposito(Conta conta, double valor) {
		conta.setSaldo(conta.getSaldo() + valor);
		this.salvar(conta);
		Transacao transacao = new Transacao();
		Date data = new Date();
		SimpleDateFormat formatar = new SimpleDateFormat("dd/MM/yyyy - HH:mm");
		formatar.format(data);
		String dataHoraFormatada = formatar.format(data);
		transacao.setDataHora(dataHoraFormatada);
		transacao.setConta(conta);
		transacao.setTipo("deposito");
		transacao.setValor(valor);
		transacaoService.salvar(transacao);
	}
	
	@Transactional(rollbackFor = Exception.class)
	public void transferencia (Conta contaOrigem, Conta contaDestino, double valor) {
		this.saque(contaOrigem, valor);
		this.deposito(contaDestino, valor);
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
