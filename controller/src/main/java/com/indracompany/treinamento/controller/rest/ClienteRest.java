package com.indracompany.treinamento.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
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
	Cliente object = clienteService.buscarClientePorCpf(cpf);
	return object != null ? ResponseEntity.ok(object) : ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/buscar-por-nome/{nome}", produces = {"application/json"})
    public @ResponseBody ResponseEntity<Cliente> buscarClientePorNome(final @PathVariable String nome) {
	Cliente object = clienteService.buscarClientePorNome(nome);
	return object != null ? ResponseEntity.ok(object) : ResponseEntity.notFound().build();
    }
    
    @GetMapping(value = "/buscar-por-email/{email}/", produces = {"application/json"})
    public @ResponseBody ResponseEntity<Cliente> buscarClientePorEmail(final @PathVariable String email) {
	Cliente object = clienteService.buscarPorEmail(email);
	return object != null ? ResponseEntity.ok(object) : ResponseEntity.notFound().build();
    }

}
