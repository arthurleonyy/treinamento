package com.indracompany.treinamento.controller.rest;

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

    @RequestMapping(value = "/consultar-saldo/{agencia}/{numeroConta}", method = RequestMethod.GET, produces = {
	    MediaType.APPLICATION_JSON_VALUE })
    public @ResponseBody ResponseEntity<Double> consultarSaldo(final @PathVariable String agencia, String numeroConta) {
	Double saldo = contaService.consultaSaldo(agencia, numeroConta);
	return new ResponseEntity<Double>(saldo, HttpStatus.OK);
    }

    @RequestMapping(value = "/consultar-contas-cliente/{cpf}", method = RequestMethod.GET, produces = {
	    MediaType.APPLICATION_JSON_VALUE })
    public @ResponseBody ResponseEntity<List<Conta>> consultarContaCliente(final @PathVariable String cpf) {
	List<Conta> contas = contaService.obterContasDoCliente(cpf);
	return new ResponseEntity<List<Conta>>(contas, HttpStatus.OK);
    }

    @RequestMapping(value = "/saque", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public @ResponseBody ResponseEntity<Void> saque(final @RequestBody SaqueDepositoTO saqueDepositoTO) {
	Conta conta = contaService.carregarPorNumero(saqueDepositoTO.getAgencia(), saqueDepositoTO.getNumeroConta());
	contaService.saque(conta, saqueDepositoTO.getValor());
	return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @RequestMapping(value = "/deposito", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public @ResponseBody ResponseEntity<Void> deposito(final @RequestBody SaqueDepositoTO saqueDepositoTO) {
	Conta conta = contaService.carregarPorNumero(saqueDepositoTO.getAgencia(), saqueDepositoTO.getNumeroConta());
	contaService.deposito(conta, saqueDepositoTO.getValor());
	return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @RequestMapping(value = "/transferencia", method = RequestMethod.POST, produces = {
	    MediaType.APPLICATION_JSON_VALUE })
    public @ResponseBody ResponseEntity<Void> transferencia(final @RequestBody TransferenciaBancariaTO transferenciaBancariaTO) {
	Conta contaOrigem = contaService.carregarPorNumero(transferenciaBancariaTO.getAgenciaOrigem(), transferenciaBancariaTO.getNumeroContaOrigem());
	Conta contaDestino = contaService.carregarPorNumero(transferenciaBancariaTO.getAgenciaDestino(), transferenciaBancariaTO.getNumeroContaDestino());
	contaService.transferencia(contaOrigem, contaDestino, transferenciaBancariaTO.getValor());
	return new ResponseEntity<Void>(HttpStatus.OK);
    }

}
