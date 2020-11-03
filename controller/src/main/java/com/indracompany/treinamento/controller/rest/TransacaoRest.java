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

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/transacoes")
public class TransacaoRest {
	
	
	@Autowired
	private TransacaoService transacaoService;
	
	
	@RequestMapping(value = "/consultar-extrato-da-conta/{numeroConta}/{agencia}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<List<Transacao>> ObterTransacoesDaConta(final @PathVariable String agencia, String numeroConta) {
		List<Transacao> transacao = transacaoService.ObterTransacoesDaConta(agencia, numeroConta);
		return new ResponseEntity<List<Transacao>>(transacao, HttpStatus.OK);
	}
	
	
}

