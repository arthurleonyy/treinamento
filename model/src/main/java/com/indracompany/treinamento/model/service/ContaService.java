package com.indracompany.treinamento.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.enumeration.TipoTransacao;
import com.indracompany.treinamento.model.repository.ContaRepository;
import com.indracompany.treinamento.model.repository.ExtratoRepository;

@Service
public class ContaService extends GenericCrudService<Conta, Long, ContaRepository> {

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

	public void saque(Conta conta, double valor) {
		if (conta.getSaldo() < valor) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_CONTA_INSUFICIENTE);
		}
		conta.setSaldo(conta.getSaldo() - valor);
		String descricao = TipoTransacao.SAQUE + ": R$ " + valor + ". Saldo :" + conta.getSaldo() + " R$ ";
		this.salvar(conta);
		Extrato ex = new Extrato(conta, TipoTransacao.SAQUE.getTipo(), descricao, valor);
		this.extratoRepository.save(ex);
	}

	public void deposito(Long id, double valor) {
		Conta conta = super.buscar(id);
		conta.setSaldo(conta.getSaldo() + valor);
		this.salvar(conta);
		String descricao = TipoTransacao.DEPOSITO + " Realizado um deposito de R$ " + valor + " na conta"
				+ conta.getAgencia() + " saldo e : R$" + conta.getSaldo();
		Extrato extrato = new Extrato(conta, TipoTransacao.DEPOSITO.getTipo(), descricao, valor);
		this.extratoRepository.save(extrato);
	}

	@Transactional(rollbackFor = Exception.class)
	public void transferencia(Conta contaOrigem, Conta contaDestino, double valor) {

		verificaConta(contaDestino);

		contaOrigem.setSaldo(contaOrigem.getSaldo() - valor);
		contaDestino.setSaldo(contaDestino.getSaldo() + valor);
		this.salvar(contaDestino);
		this.salvar(contaOrigem);
		geraExtratoTransferencia(contaOrigem, contaDestino, valor);
	}

	private void geraExtratoTransferencia(Conta contaOrigem, Conta contaDestino, double valor) {
		String descricaoContaOrigem = TipoTransacao.TRANSFERENCIA + ": R$ " + valor + ". Seu saldo: R$"
				+ contaOrigem.getSaldo();
		String descricaoContaDestino = TipoTransacao.TRANSFERENCIA + " Transferencia da Conta "
				+ contaDestino.getAgencia() + " No valor de " + valor;
		Extrato extratoOrigem = new Extrato(contaOrigem, TipoTransacao.TRANSFERENCIA.getTipo(), descricaoContaOrigem,
				valor);
		Extrato extratoDestino = new Extrato(contaDestino, TipoTransacao.TRANSFERENCIA.getTipo(), descricaoContaDestino,
				valor);
		this.extratoRepository.save(extratoOrigem);
		this.extratoRepository.save(extratoDestino);
	}

	public void verificaConta(Conta contaDestino) {
		if (contaDestino == null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INEXISTENTE);
		}
	}

	public Conta carregarContaPorNumero(String agencia, String numeroConta) {
		Conta conta = contaRepository.findByAgenciaAndNumeroConta(agencia, numeroConta);
		if (conta == null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INEXISTENTE);
		}
		return conta;
	}

	public List<Conta> obterContasDoCliente(String cpf) {
		Cliente cliente = clienteService.buscarClientePorCpf(cpf);
		ArrayList<Conta> contas = new ArrayList<>();
		for(Conta conta : contaRepository.findByCliente(cliente)) {
			if(conta != null) {
				contas.add(conta);
			}
		}
		return contas;
	}
	
	
}
