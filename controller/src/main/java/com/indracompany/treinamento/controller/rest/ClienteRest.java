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

import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.service.ClienteService;


@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/clientes")
public class ClienteRest extends GenericCrudRest<Cliente, Long, ClienteService>{

	@Autowired
	private ClienteService clienteService; 
	
	@RequestMapping(value = "/buscar-por-cpf/{cpf}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<Cliente> buscarClientePorCpf(final @PathVariable String cpf) {
		Cliente retorno = clienteService.buscarClientePorCpf(cpf);
		return  new ResponseEntity<>(retorno, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/buscar-por-nome/{nome}" , method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<Cliente> buscarClientePorNome(final @PathVariable String nome) {
		Cliente retorno = clienteService.buscarClientePorNome(nome);
		return new ResponseEntity<>(retorno, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/buscar-por-inicial/{inicial}" , method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<List<Cliente>> buscarClientesPorInicial(final @PathVariable String inicial) {
		List<Cliente> clientes = clienteService.buscarClientesPorInicial(inicial);
		return  new ResponseEntity<>(clientes, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/buscar-por-email/{email}/" , method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<Cliente> buscarClientePorEmail (final @PathVariable String email) {
		Cliente cliente = clienteService.findByEmail(email);
		return new ResponseEntity<Cliente>(cliente, HttpStatus.OK);
	}

}
