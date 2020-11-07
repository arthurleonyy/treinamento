package com.indracompany.treinamento.model.service;

import java.math.BigDecimal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.indracompany.treinamento.enums.OrigemMensagemEnum;
import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.dto.MovimentacaoContaDTO;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.MovimentacaoConta;
import com.indracompany.treinamento.model.repository.ContaRepository;

@Service
public class ContaService extends GenericCrudService<Conta, Long, ContaRepository> {

  private ContaRepository contaRepository;

  private ClienteService clienteService;

  private MovimentacaoContaService movimentacaoContaService;

  @Autowired
  public ContaService(ContaRepository contaRepository, ClienteService clienteService, MovimentacaoContaService movimentacaoContaService) {
    super();
    this.contaRepository = contaRepository;
    this.clienteService = clienteService;
    this.movimentacaoContaService = movimentacaoContaService;
  }

  public BigDecimal consultarSaldo(String agencia, String numeroConta) {
    Conta conta = this.carregarContaPorAgenciaNumeroConta(agencia, numeroConta);
    movimentacaoContaService.registroDeMovimentacaoDaConta(conta, conta.getSaldo(), OrigemMensagemEnum.SALDO);
    return conta.getSaldo();
  }

  public void saque(Conta conta, BigDecimal valor) {
    if (conta.getSaldo().compareTo(valor) < 0) {
      throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_CONTA_INSUFICIENTE);
    }
    conta.setSaldo(conta.getSaldo().subtract(valor));
    this.salvar(conta);
    movimentacaoContaService.registroDeMovimentacaoDaConta(conta, valor, OrigemMensagemEnum.SAQUE);
  }

  public void deposito(Conta conta, BigDecimal valor) {
    conta.setSaldo(conta.getSaldo().add(valor));
    this.salvar(conta);
    movimentacaoContaService.registroDeMovimentacaoDaConta(conta, valor, OrigemMensagemEnum.DEPOSITO);
  }

  @Transactional(rollbackFor = Exception.class)
  public void transferencia(Conta contaOrigem, Conta contaDestino, BigDecimal valor) {
    this.saque(contaOrigem, valor);
    this.deposito(contaDestino, valor);
    movimentacaoContaService.registroDeMovimentacaoDaConta(contaOrigem, valor, OrigemMensagemEnum.TRANFERENCIA);
  }

  public List<MovimentacaoConta> extrato(MovimentacaoContaDTO dto) {
    Conta contaRecuperada = this.carregarContaPorAgenciaNumeroConta(dto.getConta().getNumeroAgencia(), dto.getConta().getNumeroConta());
    return movimentacaoContaService.recuperaMovimentacaoDaConta(contaRecuperada);
  }

  public Conta carregarContaPorAgenciaNumeroConta(String agencia, String numeroConta) {
    Conta conta = repository.findByNumeroAgenciaAndNumeroConta(agencia, numeroConta);
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

}
