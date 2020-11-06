package com.indracompany.treinamento.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.indracompany.treinamento.model.dto.SaqueDepositoDTO;
import com.indracompany.treinamento.model.dto.TransferenciaBancariaDTO;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.MovimentoConta;
import com.indracompany.treinamento.model.service.ClienteService;
import com.indracompany.treinamento.model.service.ContaService;
import com.indracompany.treinamento.model.service.MovimentoContaService;

import io.swagger.annotations.ApiParam;

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/movimentocontas")

public class MovimentacaoContaRest {
	
	@Autowired
	private ContaService contaService;
	
	@Autowired
	private ClienteService clienteService;
	
	@Autowired
	private MovimentoContaService movContaService;
	

	@RequestMapping(value = "/", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<List<MovimentoConta>> relatorioExtrato() {
	   final List<MovimentoConta> contaMov = movContaService.relatorioExtrato();
		return new ResponseEntity<List<MovimentoConta>>(contaMov, HttpStatus.OK);
	}
		
	@RequestMapping(value = "/{contaid}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<List<MovimentoConta>> obterMovimentoConta(final @PathVariable Long contaid) {
		List<MovimentoConta> contaMov = movContaService.obterMovimentoConta(contaid);
		return new ResponseEntity<List<MovimentoConta>>(contaMov, HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/consulta-extrato/{agencia}/{numeroConta}", produces = {"application/json"})
    public @ResponseBody ResponseEntity<List<MovimentoConta>> consultaMovimentoContaPorAgenciaAndNumeroConta(
	    final @PathVariable String agencia, String numeroConta) {
	List<MovimentoConta> contaMov = movContaService.consultaMovimentoContaPorAgenciaAndNumeroConta(agencia, numeroConta);
	return new ResponseEntity<List<MovimentoConta>>(contaMov, HttpStatus.OK);
    }

}
