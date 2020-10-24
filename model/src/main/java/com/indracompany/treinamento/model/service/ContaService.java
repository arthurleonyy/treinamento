package com.indracompany.treinamento.model.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.repository.ContaRepository;

@Service
public class ContaService extends GenericCrudService<Conta, Long, ContaRepository> {

    @Autowired
    private ContaRepository contaRepository;

    @Autowired
    private ClienteService clienteService;

    public double consultaSaldo(String agencia, String numeroConta) {
	Conta conta = this.carregarPorNumero(agencia, numeroConta);
	return conta.getSaldo();
    }

    public void saque(Conta conta, double valor) {
	if (conta.getSaldo() < valor) {
	    // TODO criar uma mensagem
	    throw new AplicacaoException("Saldo da conta insuficiente");
	}
	conta.setSaldo(conta.getSaldo() - valor);
	this.salvar(conta);
    }

    public void deposito(Conta conta, double valor) {
	conta.setSaldo(conta.getSaldo() + valor);
	this.salvar(conta);
    }

    @Transactional(rollbackFor = Exception.class)
    public void transferencia(Conta contaOrigem, Conta contaDestino, double valor) {
	this.saque(contaOrigem, valor);
	this.deposito(contaDestino, valor);
    }

    public Conta carregarPorNumero(String agencia, String numeroConta) {
	Optional<Conta> conta = contaRepository.findByAgenciaAndNumeroConta(agencia, numeroConta);
	if (!conta.isPresent()) {
	    throw new AplicacaoException("Conta inexistente");
	}

	return conta.get();
    }

    public List<Conta> obterContasDoCliente(String cpf) {
	Cliente cliente = clienteService.buscarClientePorCpf(cpf);
	if (cliente != null) {
	    return contaRepository.findByCliente(cliente);
	}
	return null;
    }

}
