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

import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.service.ContaService;

import io.swagger.annotations.ApiParam;

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/conta")
public class ContaRest {
	
	@Autowired
  private ContaService contaService;
  
  @Autowired
	private ExtratoService extratoService;
	
	
	@RequestMapping(value = "/criar", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
	public @ResponseBody ResponseEntity<Conta> criar(@ApiParam("Criar conta") final @RequestBody String cpf) {
		Conta conta = contaService.criarConta(cpf);
		return new ResponseEntity<>(conta, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/consultar-saldo/{agencia}&{numeroConta}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<Double> consultarSaldo(final @PathVariable String agencia, final @PathVariable String numeroConta) {
		Double saldo = contaService.consultarSaldo(agencia, numeroConta);
		return new ResponseEntity<>(saldo, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/consultar-contas-cliente/{cpf}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<List<Conta>> consultarContaCliente(final @PathVariable String cpf) {
		List<Conta> contas = contaService.obterContasDoCliente(cpf);
		return new ResponseEntity<>(contas, HttpStatus.OK);
	}
  
  @RequestMapping(value = "/consultar-extrato/{agencia}&{numeroConta}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<List<OperacaoFinanceira>> consultarExtrato(final @PathVariable String agencia, final @PathVariable String numeroConta) {
		List<OperacaoFinanceira> extrato = extratoService.consultarPorAgenciaENumeroConta(agencia, numeroConta);
		return new ResponseEntity<>(extrato, HttpStatus.OK);
	}

}
