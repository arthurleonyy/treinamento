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
	
	//Buscar clientes por CPF
	@RequestMapping(value = "/buscar-por-cpf/{cpf}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<Cliente> buscarClientePorCpf(final @PathVariable String cpf) {
		
		Cliente retornoCpf = clienteService.buscarClientePorCpf(cpf);
		return  new ResponseEntity<>(retornoCpf, HttpStatus.OK);
	}
	
	//Buscar cliente por nome
	@RequestMapping(value = "/buscar-por-nome/{nome}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<Cliente> buscarClientePorNome(final @PathVariable String nome) {
		
		Cliente retornoNome = clienteService.buscarClientePorNome(nome);
		return  new ResponseEntity<>(retornoNome, HttpStatus.OK);
	}
	
	//Buscar lista de clientes por nome
		@RequestMapping(value = "/buscar-lista-por-nome/{nome}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
		public @ResponseBody ResponseEntity<List<Cliente>> buscarListaDeClientesPorNome(@PathVariable String nome) {
			
			String forLike = "%";
			
			nome = forLike+nome+forLike;
			
			List<Cliente> retornoListaPorNome = clienteService.buscarListaDeClientePorNome(nome);
			if(retornoListaPorNome.isEmpty()) {
				
				return new ResponseEntity<List<Cliente>>(retornoListaPorNome, HttpStatus.NO_CONTENT);
				
			}else {
			
				return new ResponseEntity<List<Cliente>>(retornoListaPorNome, HttpStatus.OK);
			}	
	}
	
	//Buscar Lista de clientes ativos
	@RequestMapping(value = "/buscar-ativos/{ativo}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE})
	public @ResponseBody ResponseEntity<List<Cliente>> buscarClientePorAtivo(final @PathVariable boolean ativo) {
		
		List<Cliente> retornoListaAtivos = clienteService.buscarClientePorAtivo(ativo);
		if(retornoListaAtivos.isEmpty()) {
			
			return new ResponseEntity<List<Cliente>>(retornoListaAtivos, HttpStatus.NO_CONTENT);
			
		}else {
		
			return new ResponseEntity<List<Cliente>>(retornoListaAtivos, HttpStatus.OK);
		}	

	}

}
