package com.indracompany.treinamento.controller.rest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.service.ClienteService;


@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/clientes")
public class ClienteRest extends GenericCrudRest<Cliente, Long, ClienteService>{

	
	@Autowired
	private ClienteService clienteService;
	
	@GetMapping("/{email}/")
	public ResponseEntity<Cliente> getClienteByEmail(@PathVariable("email") String email){
		
		Cliente cliente = this.clienteService.buscarEmail(email);
		return ResponseEntity.ok(cliente);
	}
	
	
	
	/*
	 * @GetMapping("/{cpf}") public ResponseEntity<Cliente>
	 * buscarCpf(@PathVariable("cpf") String cpf){
	 * 
	 * Cliente cliente = this.clienteService.buscarCpf(cpf); return
	 * ResponseEntity.ok(cliente);
	 * 
	 * }
	 */
	 
	
	
}
