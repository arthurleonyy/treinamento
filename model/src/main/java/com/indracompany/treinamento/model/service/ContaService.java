package com.indracompany.treinamento.model.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.OperacaoEnum;
import com.indracompany.treinamento.model.repository.ContaRepository;

@Service
public class ContaService extends GenericCrudService<Conta, Long, ContaRepository> {

	@Autowired
	private ContaRepository contaRepository;

	@Autowired
	private ClienteService clienteService;

	@Autowired
	private ExtratoService extratoService;
	

	public Conta salvarNovaConta(Conta conta) {
		Conta contaExistente = this.carregarContaParaValidacao(conta.getAgencia(), conta.getNumeroConta());
		while (contaExistente != null) {
			conta.setNumeroConta(RandomStringUtils.randomNumeric(5));
			contaExistente = this.carregarContaParaValidacao(conta.getAgencia(), conta.getNumeroConta());
		}
		return super.salvar(conta);
	}

	public BigDecimal consultarSaldo(String agencia, String numeroConta) {
		Conta conta = this.carregarContaPorNumero(agencia, numeroConta);
		return conta.getSaldo();
	}

	public Conta consultarConta(String agencia, String numeroConta) {
		Conta conta = this.carregarContaPorNumero(agencia, numeroConta);
		return conta;
	}

	@Transactional(rollbackFor = Exception.class)
	public void saque(Conta conta, BigDecimal valor, boolean isTransfer) {
		LocalDateTime dataHora = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
		String formattedDateTime = dataHora.format(formatter);

		String sha1 = org.apache.commons.codec.digest.DigestUtils.sha1Hex(formattedDateTime);

		OperacaoEnum operacao = OperacaoEnum.SAQUE;
		if ((valor.compareTo(conta.getSaldo()) == 1)) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_CONTA_INSUFICIENTE);
		}
		conta.setSaldo(conta.getSaldo().subtract(valor));
		this.salvar(conta);

		if (!isTransfer) {
			String descricao = "Saque bem sucedido.";
			extratoService.realizarOperacao(conta, valor.multiply(new BigDecimal(-1)), operacao, sha1, dataHora, descricao);
		}
	}

	@Transactional(rollbackFor = Exception.class)
	public void deposito(Conta conta, BigDecimal valor, boolean isTransfer) {
		LocalDateTime dataHora = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
		String formattedDateTime = dataHora.format(formatter);

		String sha1 = org.apache.commons.codec.digest.DigestUtils.sha1Hex(formattedDateTime);

		OperacaoEnum operacao = OperacaoEnum.DEPOSITO;
		conta.setSaldo(conta.getSaldo().add(valor));
		this.salvar(conta);

		if (!isTransfer) {
			String descricao = "Depósito bem sucedido.";
			extratoService.realizarOperacao(conta, valor, operacao, sha1, dataHora, descricao);
		}
	}

	@Transactional(rollbackFor = Exception.class)
	public void transferencia(Conta contaOrigem, Conta contaDestino, BigDecimal valor) {
		LocalDateTime dataHora = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
		String formattedDateTime = dataHora.format(formatter);

		String sha1 = org.apache.commons.codec.digest.DigestUtils.sha1Hex(formattedDateTime);

		OperacaoEnum operacao = OperacaoEnum.TRANSFERENCIA;
		this.saque(contaOrigem, valor, true);
		this.deposito(contaDestino, valor, true);

		String descricao = "Transferência realizada para " + contaDestino.getCliente().getNome() + " agência: "
				+ contaDestino.getAgencia() + " conta nº: " + contaDestino.getNumeroConta() + ".";
		extratoService.realizarOperacao(contaOrigem, valor.multiply(new BigDecimal(-1)), operacao, sha1, dataHora, descricao);

		descricao = "Transferência recebida de " + contaOrigem.getCliente().getNome() + " agência: "
				+ contaOrigem.getAgencia() + " conta nº: " + contaOrigem.getNumeroConta() + ".";
		extratoService.realizarOperacao(contaDestino, valor, operacao, sha1, dataHora, descricao);
	}

	public Conta carregarContaPorNumero(String agencia, String numeroConta) {
		Conta conta = repository.findByAgenciaAndNumeroConta(agencia, numeroConta);
		if (conta == null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INEXISTENTE);
		}
		return conta;
	}
	
	public Conta carregarContaParaValidacao(String agencia, String numeroConta) {
		Conta conta = repository.findByAgenciaAndNumeroConta(agencia, numeroConta);
		if (conta == null) {
			return conta;
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
}
