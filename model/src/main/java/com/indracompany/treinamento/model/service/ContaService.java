package com.indracompany.treinamento.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.repository.ContaRepository;

@Service
public class ContaService extends GenericCrudService<Conta, Long, ContaRepository> {

    @Autowired
    private ContaRepository contaRepository;
    
    @Autowired
    private ExtratoService extratoService;

    @Autowired
    private ClienteService clienteService;

    public double consultaSaldo(String agencia, String numeroConta) {
	Conta conta = this.carregarPorNumero(agencia, numeroConta);
	return conta.getSaldo();
    }

    public void saque(Conta conta, double valor) {
	conta = super.buscar(conta.getId());
	validaConta(conta, valor);
	conta.setSaldo(conta.getSaldo() - valor);
	this.salvar(conta);
	
	this.extratoService.gerarExtratoParaSaque(conta, valor);
    }
    
    public void deposito(Long id, Double valor) {
        Conta conta = super.buscar(id);
        Assert.notNull(conta, "Conta não deve ser nula");
        validaContaDestino(conta.getId());
        conta.setSaldo(conta.getSaldo() + valor);
        this.contaRepository.save(conta);
        
        this.extratoService.gerarExtratoParaDeposito(valor, conta);
    }
    
    @Transactional(rollbackFor = Exception.class)
    public void transferencia(Long contaOrigemId, Long contaDestinoId, double valor) {
	try {
	    Conta contaOrigem = super.buscar(contaOrigemId);
	    Conta contaDestino = super.buscar(contaDestinoId);

	    contaOrigem.setSaldo(contaOrigem.getSaldo() - valor);
	    validaContaDestino(contaDestino.getId());
	    contaDestino.setSaldo(contaDestino.getSaldo() + valor);
	    super.salvar(contaOrigem);
	    super.salvar(contaDestino);
	    
	   this.extratoService.gerarExtratoParaTransferencia(valor, contaOrigem, contaDestino);
	} catch (NoSuchElementException e) {
	    throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INEXISTENTE);
	}
    }

    public Conta carregarPorNumero(String agencia, String numeroConta) {
	Optional<Conta> conta = contaRepository.findByAgenciaAndNumeroConta(agencia, numeroConta);
	if (!conta.isPresent()) {
	    throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INEXISTENTE);
	}

	return conta.get();
    }

    public List<Conta> obterContasDoCliente(String cpf) {
	Cliente cliente = clienteService.buscarClientePorCpf(cpf);
	List<Conta> contas = new ArrayList<>();
	for (Conta conta : contaRepository.findByCliente(cliente)) {
	    if (conta != null) {
		contas.add(conta);
	    }
	}

	return contas;
    }
    
    private void validaConta(Conta conta, double valor) {
	if (conta.getSaldo() < valor) {
	    throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_CONTA_INSUFICIENTE);
	}
    }

    private void validaContaDestino(Long contaDestinoId) {
	Optional<Conta> conta = getRepository().findById(contaDestinoId);
	if (!conta.isPresent()) {
	    throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_DESTINO_NAO_EXISTE);
	}

	if (conta.get().getAgencia().isEmpty() && conta.get().getNumeroConta().isEmpty()) {
	    throw new AplicacaoException(ExceptionValidacoes.ERRO_AGENCIA_OU_NUMERO_CONTA_NAO_INFORMADO_CORRETAMENTE);
	}
    }

}
