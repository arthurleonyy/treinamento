package com.indracompany.treinamento.controller.rest;


<<<<<<< HEAD
import javax.validation.Valid;
=======
import java.util.List;
>>>>>>> 4cbd62a0c547da997a8471a2203bf6043970123a

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
	
	@RequestMapping(value =  "/buscar-por-nome/{nome}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody  ResponseEntity<List<Cliente>>  buscarClientePorNome(final @PathVariable String  nome) {
		
		  List<Cliente> result = clienteService.buscarClientePorNome(nome);
		  return  new ResponseEntity<>(result, HttpStatus.OK);

	  
	  }
	
	
	@RequestMapping(value = "/buscar-por-email/{email}/", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<Cliente>buscarClientePorEmail(final @PathVariable String email) {
		
		Cliente retorno = clienteService.buscarClientePorEmail(email);
		return  new ResponseEntity<>(retorno, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/buscar-por-email/{email}/", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<Cliente> buscarClientePorEmail(final @PathVariable String email){
		Cliente retorno = clienteService.buscarClientePorEmail(email);
		return new ResponseEntity<>(retorno, HttpStatus.OK);
	}

	@RequestMapping(value = "/cadastrar-cliente", method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<Cliente> cadastrar(final @Valid @RequestBody Cliente cliente){
		Cliente novoCliente = clienteService.cadastrar(cliente);
		return new ResponseEntity<>(novoCliente, HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/atualizar-cliente/{id}", method = RequestMethod.PUT, produces = {MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<Cliente> atualizar(final @Valid @RequestBody Cliente cliente, @PathVariable Long id){
		Cliente cli = clienteService.buscarClientePorId(id);
		clienteService.atualizar(cli);
		return new ResponseEntity<>(cli, HttpStatus.OK);
	}
	
	@RequestMapping(value = "deletar-cliente/{id}", method = RequestMethod.DELETE, produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<Void> deletar(@PathVariable Long id){
		clienteService.deletar(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
}
