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

import com.indracompany.treinamento.model.dto.SaqueDepositoDTO;
import com.indracompany.treinamento.model.dto.TransferenciaBancariaDTO;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.service.ClienteService;
import com.indracompany.treinamento.model.service.ContaService;

import io.swagger.annotations.ApiParam;

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/contas")
public class ContaRest {
	
	@Autowired
	private ContaService contaService;
	
	@Autowired
	private ClienteService clienteService;
	
	@RequestMapping(value = "/consultar-saldo/{agencia}/{numeroConta}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<Double> consultarSaldo(final @PathVariable String agencia, String numeroConta) {
		Double saldo = contaService.consultarSaldo(agencia, numeroConta);
		return new ResponseEntity<Double>(saldo, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/consultar-contas-cliente/{cpf}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<List<Conta>> consultarContaCliente(final @PathVariable String cpf) {
		List<Conta> contas = contaService.obterContasDoCliente(cpf);
		return new ResponseEntity<List<Conta>>(contas, HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/saque", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<Void> saque(@ApiParam("JSON com dados necessarios para realizar o saque ") final @RequestBody SaqueDepositoDTO dto ) {
		Conta conta = contaService.carregarContaPorNumero(dto.getAgencia(), dto.getNumeroConta());
		contaService.saque(conta, dto.getValor());
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/deposito", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<Void> deposito(@ApiParam("JSON com dados necessarios para realizar o deposito ") final @RequestBody SaqueDepositoDTO dto ) {
		Conta conta = contaService.carregarContaPorNumero(dto.getAgencia(), dto.getNumeroConta());
		contaService.deposito(conta.getId(), dto.getValor());
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/transferencia", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<Void> transferencia(@ApiParam("JSON com dados necessarios para realizar Transferencia") final @RequestBody TransferenciaBancariaDTO dto){
		Conta contaOrigem = contaService.carregarContaPorNumero(dto.getAgenciaOrigem(), dto.getNumeroContaOrigem());
		Conta contaDestino = contaService.carregarContaPorNumero(dto.getAgenciaDestino(), dto.getNumeroContaDestino());
		contaService.transferencia(contaOrigem, contaDestino, dto.getValor());
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	
	
}
