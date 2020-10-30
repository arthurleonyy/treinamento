package com.indracompany.treinamento.controller.rest;

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

import com.indracompany.treinamento.model.entity.Transacao;
import com.indracompany.treinamento.model.service.TransacaoService;

import io.swagger.annotations.ApiParam;

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/extrato")
public class TransacaoRest {

	
	@Autowired
	private TransacaoService trans;
	
	
	

	@RequestMapping(value = "/consultar-extrato/{agencia}/{numeroConta}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<List> consultarExtrato(@ApiParam(value= "Agencia xxxxxx", required = true)@PathVariable String agencia, String numeroconta ) {
		List <Transacao> transacaoextrato = trans.gerarExtratosDaConta (agencia, numeroconta );
		return new ResponseEntity<List>(transacaoextrato, HttpStatus.OK);
	}
		
		
	}

