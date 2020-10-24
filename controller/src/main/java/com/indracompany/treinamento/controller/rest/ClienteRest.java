package com.indracompany.treinamento.controller.rest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
<<<<<<< HEAD
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
=======
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
>>>>>>> ce065ff95afefa915c983dc6ce34288838b1b36f
import org.springframework.web.bind.annotation.RestController;

import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.service.ClienteService;

import io.micrometer.core.ipc.http.HttpSender.Request;


@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/clientes")
public class ClienteRest extends GenericCrudRest<Cliente, Long, ClienteService>{

<<<<<<< HEAD
	
	@Autowired
	private ClienteService clienteService;
	
	
	  @GetMapping("procurando/{email}/")
	  @ResponseStatus(code = HttpStatus.FOUND)
	  public  ResponseEntity<Cliente> getClienteByEmail(@PathVariable("email") String email){ 
		 return ResponseEntity.ok(this.clienteService.buscarEmail(email)) ; 
		
	  }
	 
	
	  @GetMapping("/{cpf}") 
	  @ResponseStatus(code = HttpStatus.FOUND)
	  public Cliente buscarCpf(@PathVariable("cpf") String cpf){
		  Cliente cliente = this.clienteService.buscarCpf(cpf); 
	  
		  return cliente;
	  
	 }
	 
	 
	 
	
	
=======
	@Autowired
	private ClienteService clienteService; 
	
	@RequestMapping(value = "/buscar-por-cpf/{cpf}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<Cliente> buscarClientePorCpf(final @PathVariable String cpf) {
		Cliente retorno = clienteService.buscarClientePorCpf(cpf);
		return  new ResponseEntity<>(retorno, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/buscar-por-nome/{nome}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<Cliente> buscarClientePorNome(final @PathVariable String nome) {
		Cliente retorno = clienteService.buscarClientePorNome(nome);
		return  new ResponseEntity<>(retorno, HttpStatus.OK);
	}
	

>>>>>>> ce065ff95afefa915c983dc6ce34288838b1b36f
}
