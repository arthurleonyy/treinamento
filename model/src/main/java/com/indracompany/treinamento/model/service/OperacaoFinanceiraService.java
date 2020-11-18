package com.indracompany.treinamento.model.service;

import java.time.Instant;
import java.util.List;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.OperacaoFinanceira;
import com.indracompany.treinamento.model.entity.enums.TipoOperacaoFinanceira;
import com.indracompany.treinamento.model.repository.OperacaoFinanceiraRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OperacaoFinanceiraService
    extends GenericCrudService<OperacaoFinanceira, Long, OperacaoFinanceiraRepository> {

  @Autowired
  private OperacaoFinanceiraRepository operacaoFinanceiraRepository;

  @Autowired
  private ContaService contaService;

  public void saque(Conta conta, double valor, TipoOperacaoFinanceira operacao) {

    double saldo = conta.getSaldo();

    if (saldo < valor) {
      throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_CONTA_INSUFICIENTE);
    }

    conta.setSaldo(saldo - valor);

    contaService.salvar(conta);

    this.salvarOperacao(conta, operacao, valor, saldo);
  }

  public void saque(Conta conta, double valor) {
    this.saque(conta, valor, TipoOperacaoFinanceira.SAQUE);
  }

  public void deposito(Conta conta, double valor, TipoOperacaoFinanceira operacao) {

    double saldo = conta.getSaldo();

    conta.setSaldo(saldo + valor);

    contaService.salvar(conta);

    this.salvarOperacao(conta, operacao, valor, saldo);
  }

  public void deposito(Conta conta, double valor) {
    this.deposito(conta, valor, TipoOperacaoFinanceira.DEPOSITO);
  }

  @Transactional(rollbackFor = Exception.class)
  public void transferencia(Conta contaOrigem, Conta contaDestino, double valor) {
    this.saque(contaOrigem, valor, TipoOperacaoFinanceira.TRANSFERENCIA);
    this.deposito(contaDestino, valor, TipoOperacaoFinanceira.TRANSFERENCIA);
  }

  private boolean salvarOperacao(Conta conta, TipoOperacaoFinanceira operacao, double valor, double saldoAnterior) {
    OperacaoFinanceira operacaoFinanceira = new OperacaoFinanceira();
    operacaoFinanceira.setConta(conta);
    operacaoFinanceira.setTipoOperacaoFinanceira(operacao);
    operacaoFinanceira.setSaldoAntesOperacao(saldoAnterior);
    operacaoFinanceira.setValorOperacao(valor);
    operacaoFinanceira.setSaldoAposOperacao(conta.getSaldo());
    operacaoFinanceira.setDataHoraOperacao(Instant.now());

    try {
      this.salvar(operacaoFinanceira);
      return true;
    } catch (AplicacaoException e) {
      throw new AplicacaoException(ExceptionValidacoes.ERRO_EXCLUSAO_GENERICO, e);
    }
  }

  public List<OperacaoFinanceira> consultarOperacoes(Conta conta) {
    return operacaoFinanceiraRepository.findByContaOrderByDataHoraOperacaoDesc(conta);
  }

}
