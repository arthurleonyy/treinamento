package com.indracompany.treinamento.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.entity.enumeration.TipoTransacao;
import com.indracompany.treinamento.model.repository.ExtratoRepository;

@Service
public class ExtratoService extends GenericCrudService<Extrato, Long, ExtratoRepository> {

    @Autowired
    private ExtratoRepository extratoRepository;

    public void gerarExtratoParaSaque(Conta conta, double valor) {
	String descricao = TipoTransacao.SAQUE + ": R$ " + valor + ". Novo Saldo: R$ " + conta.getSaldo();
	Extrato extrato = new Extrato(conta, TipoTransacao.SAQUE.getTipo(), descricao, valor);
	this.extratoRepository.save(extrato);
    }

    public void gerarExtratoParaDeposito(Double valor, Conta conta) {
	String descricao = TipoTransacao.DEPOSITO + ": R$ " + valor + ". Novo Saldo: R$ " + conta.getSaldo();
	Extrato extrato = new Extrato(conta, TipoTransacao.DEPOSITO.getTipo(), descricao, valor);
	this.extratoRepository.save(extrato);
    }

    public void gerarExtratoParaTransferencia(double valor, Conta contaOrigem, Conta contaDestino) {

	String descricaoOrigem = String.format("%1$s: Transferido R$ %2$s para a conta %3$s. Novo Saldo: R$ %4$s",
		TipoTransacao.TRANSFERENCIA, valor, contaDestino.getNumeroConta(), contaOrigem.getSaldo());
	String descricaoDestino = String.format("%1$s: Recebido R$ %2$s da conta %3$s. Novo Saldo: R$ %4$s",
		TipoTransacao.TRANSFERENCIA, valor, contaOrigem.getNumeroConta(), contaDestino.getSaldo());

	Extrato historicoTransacaoOrigem = new Extrato(contaOrigem, TipoTransacao.TRANSFERENCIA.getTipo(),
		descricaoOrigem, valor);
	Extrato historicoTransacaoDestino = new Extrato(contaDestino, TipoTransacao.TRANSFERENCIA.getTipo(),
		descricaoDestino, valor);

	this.extratoRepository.save(historicoTransacaoDestino);
	this.extratoRepository.save(historicoTransacaoOrigem);
    }

    public List<Extrato> consultaExtratoPorConta(Long contaId) {
	List<Extrato> transacoes = new ArrayList<>();
	for (Extrato extrato : extratoRepository.findByContaId(contaId)) {
	    if (extrato != null) {
		transacoes.add(extrato);
	    }
	}

	return transacoes;
    }

    public List<Extrato> consultaExtratoPorAgenciaAndNumeroConta(String agencia, String numeroConta) {
	return extratoRepository.findByAgenciaAndNumeroConta(agencia, numeroConta);
    }

}
