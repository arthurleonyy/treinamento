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
import com.indracompany.treinamento.model.entity.Transacao;
import com.indracompany.treinamento.model.enuns.TipoDeConta;
import com.indracompany.treinamento.model.enuns.TipoOperacao;
import com.indracompany.treinamento.model.repository.ContaRepository;
import com.indracompany.treinamento.model.repository.TransacaoRepository;
import com.indracompany.treinamento.util.DataUtil;

@Service
public class ContaService extends GenericCrudService<Conta, Long, ContaRepository> {

	@Autowired
	private DataUtil dataUtil;

	@Autowired
	private TransacaoService transacaoservice;

	@Autowired
	private TransacaoRepository transacaoRepository;

	@Autowired
	private ContaRepository contaRepository;

	@Autowired
	private ClienteService clienteService;

	@Autowired
	private ContaService contaService;

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

		Date data = new Date();
		Transacao transacao = new Transacao(data,TipoDeConta.CORRENTE,TipoOperacao.SAQUE, valor, conta);
		transacao.setInformacoes("Saque Efetuado com Sucesso");
		transacao = transacaoRepository.save(transacao);

	}

	public void deposito(Conta conta, double valor) {
		conta.setSaldo(conta.getSaldo() + valor);
		this.salvar(conta);

		Date data = new Date();
		Transacao transacao = new Transacao(data,TipoDeConta.POUPANCA, TipoOperacao.DEPOSITO, valor, conta);
		transacao.setInformacoes("Deposito Efetuado com Sucesso");
		transacao = transacaoRepository.save(transacao);
	}

	@Transactional(rollbackFor = Exception.class)
	public void transferencia(Conta contaOrigem, Conta contaDestino, double valor) {
		this.saque(contaOrigem, valor);
		this.deposito(contaDestino, valor);

		Date data = new Date();
		Transacao transacao = new Transacao(data,TipoDeConta.CORRENTE, TipoOperacao.TRANSFERENCIAORIGEM, valor, contaDestino);
		transacao.setInformacoes("Transferencia  Efetuado com Sucesso");
		transacao = transacaoRepository.save(transacao);

		Transacao transacao2 = new Transacao(data,TipoDeConta.POUPANCA, TipoOperacao.TRANSFERENCIADESTINO, valor, contaOrigem);
		transacao.setInformacoes("Transferencia  Efetuado com Sucesso");
		transacao = transacaoRepository.save(transacao);

	}

	public Conta carregarContaPorNumero(String agencia, String numeroConta) {
		Conta conta = repository.findByAgenciaAndNumeroConta(agencia, numeroConta);
		if (conta == null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INEXISTENTE);
		}
		return conta;
	}

	public List<Conta> obterContasDoCliente(String cpf) {
		Cliente cli = clienteService.buscarClientePorCpf(cpf);
		if (cli != null) {
			return contaRepository.findByCliente(cli);
		}
		return null;
	}

	public Conta verificarConta(Long id) {
		String agencia = null;
		String numeroConta = null;
		return contaRepository.findByAgenciaAndNumeroConta(agencia, numeroConta);
	}

}
