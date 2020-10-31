package com.indracompany.treinamento.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.indracompany.treinamento.model.dto.SaqueDepositoDTO;
import com.indracompany.treinamento.model.dto.TransferenciaBancariaDTO;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.service.ContaService;
import com.indracompany.treinamento.model.service.OperacaoFinanceiraService;

import io.swagger.annotations.ApiParam;

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/operacoes")
public class OperacaoFinanceiraRest {
	
	@Autowired
	private OperacaoFinanceiraService operacaoFinanceiraService;
	
	@Autowired
	private ContaService contaService;
	
	
	@RequestMapping(value = "/saque", method = RequestMethod.PUT, produces = { MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseEntity<Void> saque(@ApiParam("JSON com dados necessarios para realizar o saque ") final @RequestBody SaqueDepositoDTO dto ) {
		Conta conta = contaService.carregarPorAgenciaENumeroConta(dto.getAgencia(), dto.getNumeroConta());
		operacaoFinanceiraService.saque(conta, dto.getValor());
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/deposito", method = RequestMethod.PUT, produces = { MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseEntity<Void> deposito(@ApiParam("JSON com dados necessarios para realizar o deposito ") final @RequestBody SaqueDepositoDTO dto ) {
		Conta conta = contaService.carregarPorAgenciaENumeroConta(dto.getAgencia(), dto.getNumeroConta());
		operacaoFinanceiraService.deposito(conta, dto.getValor());
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/transferencia", method = RequestMethod.PUT, produces = {MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseEntity<Void> transferencia(@ApiParam("JSON com dados necessarios para realizar Transferencia") final @RequestBody TransferenciaBancariaDTO dto){
		Conta contaOrigem = contaService.carregarPorAgenciaENumeroConta(dto.getAgenciaOrigem(), dto.getNumeroContaOrigem());
		Conta contaDestino = contaService.carregarPorAgenciaENumeroConta(dto.getAgenciaDestino(), dto.getNumeroContaDestino());
		operacaoFinanceiraService.transferencia(contaOrigem, contaDestino, dto.getValor());
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	
}
