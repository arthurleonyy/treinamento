package com.indracompany.treinamento.controller.rest;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.service.ExtratoService;

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/extrato")
public class ExtratoRest {
	
	@Autowired
	private ExtratoService extratoService;
	
	@RequestMapping(value = "/consultar-extrato-da-conta/{agencia}/{numeroConta}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<List<Extrato>> consultarExtratoConta(final @PathVariable String agencia, String numeroConta) {


		List<Extrato> retornoExtratoConta = extratoService.carregarExtratosDaConta(agencia, numeroConta);
		if(retornoExtratoConta.isEmpty()) {
			
			return new ResponseEntity<List<Extrato>>(retornoExtratoConta, HttpStatus.NO_CONTENT);
			
		}else {
		
			return new ResponseEntity<List<Extrato>>(retornoExtratoConta, HttpStatus.OK);
		}
		
	}
	
	@RequestMapping(value = "/consultar-extrato-por-conta-e-periodo/{agencia}/{numeroConta}/{dataInicio}/{dataFim}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<List<Extrato>> consultarExtratoContaPeriodo(final @PathVariable String agencia, String numeroConta, String dataInicio, String dataFim) {


		List<Extrato> retornoExtratoContaPeriodo = extratoService.carregarExtratosPorContaPeriodo(agencia, numeroConta, dataInicio, dataFim);
		if(retornoExtratoContaPeriodo.isEmpty()) {
			
			return new ResponseEntity<List<Extrato>>(retornoExtratoContaPeriodo, HttpStatus.NO_CONTENT);
			
		}else {
		
			return new ResponseEntity<List<Extrato>>(retornoExtratoContaPeriodo, HttpStatus.OK);
		}
		
	}

}
