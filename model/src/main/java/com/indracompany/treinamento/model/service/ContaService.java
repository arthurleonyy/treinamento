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
import com.indracompany.treinamento.model.entity.HistoricoTransacao;
import com.indracompany.treinamento.model.entity.enumeration.TipoTransacao;
import com.indracompany.treinamento.model.repository.ContaRepository;
import com.indracompany.treinamento.model.repository.HistoricoTransacaoRepository;

@Service
public class ContaService extends GenericCrudService<Conta, Long, ContaRepository> {

    @Autowired
    private ContaRepository contaRepository;
    
    @Autowired
    private HistoricoTransacaoRepository transacaoRepository;

    @Autowired
    private ClienteService clienteService;

    public double consultaSaldo(String agencia, String numeroConta) {
	Conta conta = this.carregarPorNumero(agencia, numeroConta);
	return conta.getSaldo();
    }

    public void saque(Conta conta, double valor) {
	conta = super.buscar(conta.getId());
	if (conta.getSaldo() < valor) {
	    throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_CONTA_INSUFICIENTE);
	}
	conta.setSaldo(conta.getSaldo() - valor);
	String descricao = TipoTransacao.SAQUE + ": R$ " + valor + ". Novo Saldo: R$" + conta.getSaldo();
	this.salvar(conta);
	HistoricoTransacao historicoTransacao = new HistoricoTransacao(conta, TipoTransacao.SAQUE.getTipo(), descricao, valor);
        transacaoRepository.save(historicoTransacao);
    }
    
    public void deposito(Long id, Double valor) {
        Conta conta = super.buscar(id);
        Assert.notNull(conta, "Conta não deve ser nula");
        conta.setSaldo(conta.getSaldo() + valor);
        String descricao = TipoTransacao.DEPOSITO + ": R$ " + valor + ". Novo Saldo: R$" + conta.getSaldo();
        this.contaRepository.save(conta);
        HistoricoTransacao historicoTransacao = new HistoricoTransacao(conta, TipoTransacao.DEPOSITO.getTipo(), descricao, valor);
        transacaoRepository.save(historicoTransacao);
    }
    

    @Transactional(rollbackFor = Exception.class)
    public void transferencia(Long contaOrigemId, Long contaDestinoId, double valor) {
	try {
	    Conta contaOrigem = super.buscar(contaOrigemId);
	    Conta contaDestino = super.buscar(contaDestinoId);
	    String descricaoOrigem = null;
	    String descricaoDestino = TipoTransacao.TRANSFERENCIA + ": Recebido R$ " + valor + " da conta "
		    + contaOrigem.getNumeroConta();

	    contaOrigem.setSaldo(contaOrigem.getSaldo() - valor);
	    contaDestino.setSaldo(contaDestino.getSaldo() + valor);

	    descricaoOrigem = String.format("%1$s: Transferido R$ %2$s para a conta %3$s. Novo Saldo: R$%4$s",
		    TipoTransacao.TRANSFERENCIA, valor, contaDestino.getNumeroConta(), contaOrigem.getSaldo());
	    descricaoDestino = String.format("%1$s: Recebido R$ %2$s da conta %3$s. Novo Saldo: R$%4$s",
		    TipoTransacao.TRANSFERENCIA, valor, contaOrigem.getNumeroConta(), contaDestino.getSaldo());

	    HistoricoTransacao historicoTransacaoOrigem = new HistoricoTransacao(contaOrigem,
		    TipoTransacao.TRANSFERENCIA.getTipo(), descricaoOrigem, valor);
	    HistoricoTransacao historicoTransacaoDestino = new HistoricoTransacao(contaDestino,
		    TipoTransacao.TRANSFERENCIA.getTipo(), descricaoDestino, valor);

	    this.transacaoRepository.save(historicoTransacaoDestino);
	    transacaoRepository.save(historicoTransacaoOrigem);
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

}
