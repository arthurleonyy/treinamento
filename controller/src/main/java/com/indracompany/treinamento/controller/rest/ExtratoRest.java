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
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.service.ClienteService;
import com.indracompany.treinamento.model.service.ContaService;
import com.indracompany.treinamento.model.service.ExtratoService;

import io.swagger.annotations.ApiParam;

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/extratos")
public class ExtratoRest extends GenericCrudRest<Extrato, Long, ExtratoService>{
	
	@Autowired
	private ExtratoService extratoService;
	
	@RequestMapping(value = "/consultar-extrato/{agencia}/{numeroConta}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<List<Extrato>> buscarPorAgenciaConta(final @PathVariable String agencia, final @PathVariable String numeroConta) {
		List<Extrato> extratos = extratoService.buscarPorAgenciaConta(agencia, numeroConta);
		return new ResponseEntity<List<Extrato>>(extratos, HttpStatus.OK);
	}
		
}
