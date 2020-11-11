package com.indracompany.treinamento.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.indracompany.treinamento.model.dto.SaqueDepositoTO;
import com.indracompany.treinamento.model.dto.TransferenciaBancariaTO;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.service.ContaService;

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/contas")
public class ContaRest {

    @Autowired
    private ContaService contaService;

    @GetMapping(value = "/consultar-saldo/{agencia}/{numeroConta}", produces = {"application/json"})
    public @ResponseBody ResponseEntity<Double> consultarSaldo(final @PathVariable String agencia, @PathVariable String numeroConta) {
	Double saldo = contaService.consultaSaldo(agencia, numeroConta);
	return new ResponseEntity<>(saldo, HttpStatus.OK);
    }

    @GetMapping(value = "/consultar-contas-cliente/{cpf}", produces = {"application/json"})
    public @ResponseBody ResponseEntity<List<Conta>> consultarContaCliente(final @PathVariable String cpf) {
	List<Conta> contas = contaService.obterContasDoCliente(cpf);
	return ResponseEntity.ok().body(contas);
    }

    @PostMapping(value = "/saque", produces = {"application/json"})
    public @ResponseBody void saque(final @RequestBody SaqueDepositoTO saqueDepositoTO) {
	Conta conta = contaService.carregarPorNumero(saqueDepositoTO.getAgencia(), saqueDepositoTO.getNumeroConta());
	contaService.saque(conta, saqueDepositoTO.getValor());
    }

    @PostMapping(value = "/deposito", produces = {"application/json"})
    public @ResponseBody void deposito(final @RequestBody SaqueDepositoTO saqueDepositoTO) {
	Conta conta = contaService.carregarPorNumero(saqueDepositoTO.getAgencia(), saqueDepositoTO.getNumeroConta());
	contaService.deposito(conta.getId(), saqueDepositoTO.getValor());
    }

    @PostMapping(value = "/transferencia", produces = {"application/json"})
    public @ResponseBody void transferencia(final @RequestBody TransferenciaBancariaTO transferenciaBancariaTO) {
	Conta contaOrigem = contaService.carregarPorNumero(transferenciaBancariaTO.getAgenciaOrigem(), transferenciaBancariaTO.getNumeroContaOrigem());
	Conta contaDestino = contaService.carregarPorNumero(transferenciaBancariaTO.getAgenciaDestino(), transferenciaBancariaTO.getNumeroContaDestino());
	contaService.transferencia(contaOrigem.getId(), contaDestino.getId(), transferenciaBancariaTO.getValor());
    }

}
