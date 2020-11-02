package com.indracompany.treinamento.controller.rest;

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

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("rest/extrato")
public class ExtratoRest {	
	
	@Autowired
	private ExtratoService extratoService;

	@RequestMapping(value = "/extrato-por-data{agencia}/{numeroConta}" , method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<Extrato> extratoPorData(final @PathVariable String agencia, String numeroConta) {
		Extrato extrato =(Extrato) extratoService.consultarExtrato(agencia, numeroConta);
		return new ResponseEntity<>(extrato, HttpStatus.OK);		
	}
}
