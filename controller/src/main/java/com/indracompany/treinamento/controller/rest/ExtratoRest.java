package com.indracompany.treinamento.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.indracompany.treinamento.model.dto.SaqueDepositoDTO;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.OperacaoFinanceira;
import com.indracompany.treinamento.model.entity.enums.TipoOperacaoFinanceira;
import com.indracompany.treinamento.model.service.ContaService;
import com.indracompany.treinamento.model.service.ExtratoService;

import io.swagger.annotations.ApiParam;

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/extratos")
public class ExtratoRest {
	
	@Autowired
	private ExtratoService extratoService;
	
	
	@RequestMapping(value = "/consultar/{agencia}&{numeroConta}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<List<OperacaoFinanceira>> consultarSaldo(final @PathVariable String agencia, final @PathVariable String numeroConta) {
		List<OperacaoFinanceira> extrato = extratoService.consultarPorAgenciaENumeroConta(agencia, numeroConta);
		return new ResponseEntity<>(extrato, HttpStatus.OK);
	}
	
}
