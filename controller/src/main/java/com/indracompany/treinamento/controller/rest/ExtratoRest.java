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

import com.indracompany.treinamento.model.dto.ExtratoDTO;
import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.service.ExtratoService;

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/extratos")
public class ExtratoRest {
	
	@Autowired
	private ExtratoService extratoService;
	
	@RequestMapping(value = "/consultar-extrato/{agencia}/{numeroConta}", method = RequestMethod.GET,
	produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<List<Extrato>> consultarExtrato(final @PathVariable String agencia, String numeroConta) {
			return new ResponseEntity<List<Extrato>>(extratoService.consultarExtrato(agencia, numeroConta), HttpStatus.OK);
		}
			
	@RequestMapping(value = "/consultar-extrato-data/{agencia}/{numeroConta}", method = RequestMethod.GET,
	produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<List<ExtratoDTO>> consultarExtratoAgrupadoPorData(final @PathVariable String agencia, String numeroConta) {
		return new ResponseEntity<List<ExtratoDTO>>(extratoService.consultarExtratoAgrupadoPorData(agencia, numeroConta), HttpStatus.OK);
		}

}
