package com.indracompany.treinamento.model.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.entity.TipoTransacao;
import com.indracompany.treinamento.model.repository.ExtratoRepository;

@Service
public class ExtratoService extends GenericCrudService<Extrato, Long, ExtratoRepository> {

	@Autowired
	private ExtratoRepository extratoRepository;

	public Extrato consultarExtratoPorData(LocalDateTime data) {
		return extratoRepository.findByData(data);
	}

	public void gerarExtratoDeposito(double saldoAnterior, double saldoAtual, TipoTransacao transacao, LocalDateTime data, double valor, Conta conta) {

		Extrato extrato = new Extrato();
		extrato.setConta(conta);
		extrato.setSaldoAnterior(saldoAnterior);
		extrato.setSaldoAtual(saldoAtual);
		extrato.setTipoTransacao(TipoTransacao.DEPOSITO);
		extrato.setData(data);
		extrato.setValor(valor);
		extratoRepository.save(extrato);
	}
	
	public void gerarExtratoSaque(double saldoAnterior, double saldoAtual, TipoTransacao transacao, LocalDateTime data, double valor, Conta conta) {

		Extrato extrato = new Extrato();
		extrato.setConta(conta);
		extrato.setSaldoAnterior(saldoAnterior);
		extrato.setSaldoAtual(saldoAtual);
		extrato.setTipoTransacao(TipoTransacao.SAQUE);
		extrato.setData(data);
		extrato.setValor(valor);
		extratoRepository.save(extrato);
	}
	
	public void gerarExtratoTransferencia(double saldoAnterior, double saldoAtual, TipoTransacao transacao, LocalDateTime data, double valor, Conta conta) {

		Extrato extrato = new Extrato();
		extrato.setConta(conta);
		extrato.setSaldoAnterior(saldoAnterior);
		extrato.setSaldoAtual(saldoAtual);
		extrato.setTipoTransacao(TipoTransacao.TRANSFERENCIA);
		extrato.setData(data);
		extrato.setValor(valor);
		extratoRepository.save(extrato);
	}
}
