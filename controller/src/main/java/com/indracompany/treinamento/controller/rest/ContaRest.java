package com.indracompany.treinamento.controller.rest;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.indracompany.treinamento.model.dto.MovimentacaoContaDTO;
import com.indracompany.treinamento.model.dto.SaqueDepositoDTO;
import com.indracompany.treinamento.model.dto.TransferenciaBancariaDTO;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.MovimentacaoConta;
import com.indracompany.treinamento.model.service.ContaService;

import io.swagger.annotations.ApiParam;

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/contas")
public class ContaRest {

  private ContaService contaService;

  @Autowired
  public ContaRest(ContaService contaService) {
    super();
    this.contaService = contaService;
  }

  @RequestMapping(value = "/consultar-saldo/{agencia}/{numeroConta}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
  public @ResponseBody ResponseEntity<BigDecimal> consultarSaldo(final @PathVariable String agencia, String numeroConta) {
    BigDecimal saldo = contaService.consultarSaldo(agencia, numeroConta);
    return new ResponseEntity<>(saldo, HttpStatus.OK);
  }

  @RequestMapping(value = "/consultar-contas-cliente/{cpf}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
  public @ResponseBody ResponseEntity<List<Conta>> consultarContaCliente(final @PathVariable String cpf) {
    List<Conta> contas = contaService.obterContasDoCliente(cpf);
    return new ResponseEntity<List<Conta>>(contas, HttpStatus.OK);
  }

  @RequestMapping(value = "/extrato", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
  public @ResponseBody ResponseEntity<List<MovimentacaoConta>> consultarExtratoConta(MovimentacaoContaDTO dto) {
    List<MovimentacaoConta> movimentacoesConta = contaService.extrato(dto);
    return new ResponseEntity<>(movimentacoesConta, HttpStatus.OK);
  }

  @RequestMapping(value = "/saque", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE})
  public @ResponseBody ResponseEntity<Void> saque(@ApiParam("JSON com dados necessarios para realizar o saque ") final @RequestBody SaqueDepositoDTO dto) {
    Conta conta = contaService.carregarContaPorAgenciaNumeroConta(dto.getAgencia(), dto.getNumeroConta());
    contaService.saque(conta, dto.getValor());
    return new ResponseEntity<Void>(HttpStatus.OK);
  }

  @RequestMapping(value = "/deposito", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE})
  public @ResponseBody ResponseEntity<Void> deposito(
      @ApiParam("JSON com dados necessarios para realizar o deposito ") final @RequestBody SaqueDepositoDTO dto) {
    Conta conta = contaService.carregarContaPorAgenciaNumeroConta(dto.getAgencia(), dto.getNumeroConta());
    contaService.deposito(conta, dto.getValor());
    return new ResponseEntity<Void>(HttpStatus.OK);
  }

  @RequestMapping(value = "/transferencia", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE})
  public @ResponseBody ResponseEntity<Void> transferencia(
      @ApiParam("JSON com dados necessarios para realizar Transferencia") final @RequestBody TransferenciaBancariaDTO dto) {
    Conta contaOrigem = contaService.carregarContaPorAgenciaNumeroConta(dto.getAgenciaOrigem(), dto.getNumeroContaOrigem());
    Conta contaDestino = contaService.carregarContaPorAgenciaNumeroConta(dto.getAgenciaDestino(), dto.getNumeroContaDestino());
    contaService.transferencia(contaOrigem, contaDestino, dto.getValor());
    return new ResponseEntity<Void>(HttpStatus.OK);
  }

}
