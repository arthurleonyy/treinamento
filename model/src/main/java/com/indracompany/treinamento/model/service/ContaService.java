package com.indracompany.treinamento.model.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.Conta;
<<<<<<< HEAD
import com.indracompany.treinamento.model.entity.TipoTransacao;
=======
import com.indracompany.treinamento.model.entity.enums.TransacaoEnum;
>>>>>>> 4cbd62a0c547da997a8471a2203bf6043970123a
import com.indracompany.treinamento.model.repository.ContaRepository;

@Service
public class ContaService extends GenericCrudService<Conta, Long, ContaRepository> {

	@Autowired
	private ContaRepository contaRepository;

	@Autowired
	private ClienteService clienteService;
<<<<<<< HEAD

	@Autowired
	private ExtratoService extratoService;

	public Conta buscarContaPorId(Long id) {
		Optional<Conta> conta = contaRepository.findById(id);
		return conta.orElseThrow(() -> new AplicacaoException(ExceptionValidacoes.ERRO_OBJETO_NAO_ENCONTRADO));
	}

=======
	
	@Autowired
	private MovimentoContaService movContaService;
	
	
>>>>>>> 4cbd62a0c547da997a8471a2203bf6043970123a
	public double consultarSaldo(String agencia, String numeroConta) {
		Conta conta = this.carregarContaPorNumero(agencia, numeroConta);
		return conta.getSaldo();
	}
<<<<<<< HEAD

	public void saque(Conta conta, double valor) {
		
=======
	@Transactional(rollbackFor = Exception.class)
	public void saque(Conta conta, double valor) {
		TransacaoEnum transacao = TransacaoEnum.SAQUE;
>>>>>>> 4cbd62a0c547da997a8471a2203bf6043970123a
		if (conta.getSaldo() < valor) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_CONTA_INSUFICIENTE);
		}
		if (conta.getAtiva().equals(false)) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INATIVA);
		}
		
		
		conta.setSaldo(conta.getSaldo() - valor);

		this.salvar(conta);
<<<<<<< HEAD
		extratoService.gerarExtratoSaque(conta.getSaldo() + valor, conta.getSaldo(), TipoTransacao.SAQUE,
				LocalDateTime.now(), valor, conta);

	}

	public void deposito(Conta conta, double valor) {
		if (conta.getAtiva().equals(false)) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INATIVA);
		}
=======
		
		movContaService.incluirMovimento(conta, (-valor), transacao);
	}
	@Transactional(rollbackFor = Exception.class)
	public void deposito(Conta conta, double valor) {
		TransacaoEnum transacao = TransacaoEnum.DEPOSITO;
		
>>>>>>> 4cbd62a0c547da997a8471a2203bf6043970123a
		conta.setSaldo(conta.getSaldo() + valor);
		
		this.salvar(conta);
<<<<<<< HEAD

		extratoService.gerarExtratoDeposito(conta.getSaldo() - valor, conta.getSaldo(), TipoTransacao.DEPOSITO,
				LocalDateTime.now(), valor, conta);
=======
		
		movContaService.incluirMovimento(conta, valor, transacao);
>>>>>>> 4cbd62a0c547da997a8471a2203bf6043970123a
	}

	@Transactional(rollbackFor = Exception.class)
<<<<<<< HEAD
	public void transferencia(Conta contaOrigem, Conta contaDestino, double valor) {

		this.saque(contaOrigem, valor);
		this.deposito(contaDestino, valor);

		extratoService.gerarExtratoTransferencia(contaOrigem.getSaldo() + valor, contaOrigem.getSaldo(),
				TipoTransacao.TRANSFERENCIA, LocalDateTime.now(), valor, contaOrigem);
		extratoService.gerarExtratoTransferencia(contaDestino.getSaldo() - valor, contaDestino.getSaldo(),
				TipoTransacao.TRANSFERENCIA, LocalDateTime.now(), valor, contaDestino);
=======
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
>>>>>>> 4cbd62a0c547da997a8471a2203bf6043970123a
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

	public Conta buscar(Long id) {
		Optional<Conta> conta = contaRepository.findById(id);
		return conta.orElseThrow(() -> new AplicacaoException(ExceptionValidacoes.ERRO_OBJETO_NAO_ENCONTRADO));
	}

	@Transactional
	public Conta cadastrar(Conta conta) {
		return contaRepository.save(conta);
	}

	public Conta atualizar(Conta conta) {
		Conta novaConta = buscar(conta.getId());
		return contaRepository.save(novaConta);
	}

	public void delete(Long id) {
		buscar(id);
		contaRepository.deleteById(id);
	}

	public List<Conta> listar() {
		return contaRepository.findAll();
	}
}