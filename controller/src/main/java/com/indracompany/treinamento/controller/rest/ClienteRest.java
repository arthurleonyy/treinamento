package com.indracompany.treinamento.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.service.ClienteService;

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/clientes")
public class ClienteRest extends GenericCrudRest<Cliente, Long, ClienteService> {

    @Autowired
    private ClienteService clienteService;

    @GetMapping(value = "/buscar-por-cpf/{cpf}", produces = {"application/json"})
    public @ResponseBody ResponseEntity<Cliente> buscarClientePorCpf(final @PathVariable String cpf) {
	Cliente retorno = clienteService.buscarClientePorCpf(cpf);
	return new ResponseEntity<>(retorno, HttpStatus.OK);
    }

    @GetMapping(value = "/buscar-por-nome/{nome}", produces = {"application/json"})
    public @ResponseBody ResponseEntity<Cliente> buscarClientePorNome(final @PathVariable String nome) {
	Cliente retorno = clienteService.buscarClientePorNome(nome);
	return new ResponseEntity<>(retorno, HttpStatus.OK);
    }
    
    @GetMapping(value = "/buscar-por-email/{email}/", produces = {"application/json"})
    public @ResponseBody ResponseEntity<Cliente> buscarClientePorEmail(final @PathVariable String email) {
	Cliente retorno = clienteService.buscarPorEmail(email);
	return new ResponseEntity<>(retorno, HttpStatus.OK);
    }

}
