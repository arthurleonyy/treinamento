package com.indracompany.treinamento.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.service.ContaService;
import com.indracompany.treinamento.model.service.ExtratoService;

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/extrato")
public class ExtratoRest {
	
	@Autowired
	private ExtratoService extratoService;
	
	@Autowired
	private ContaService contaService;
	
	
	@GetMapping(value = "/consulta-extrato/{agencia}/{numeroConta}", produces = {"application/json"})
    public @ResponseBody ResponseEntity<List<Extrato>> consultaMovimentoContaPorAgenciaAndNumeroConta(
	    final @PathVariable String agencia, String numeroConta) {
	List<Extrato> extrato = extratoService.consultarExtratosDaConta(agencia, numeroConta);
	return new ResponseEntity<List<Extrato>>(extrato, HttpStatus.OK);
    }
			
}
