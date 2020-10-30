package com.indracompany.treinamento.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.service.ExtratoService;

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/extrato")
public class ExtratoRest {

    @Autowired
    private ExtratoService extratoService;

    @GetMapping(value = "/consulta-extrato-por-conta/{contaId}", produces = {"application/json"})
    public @ResponseBody ResponseEntity<List<Extrato>> consultaExtratoPorConta(final @PathVariable Long contaId) {
	List<Extrato> historicoTransacoes = extratoService.consultaExtratoPorConta(contaId);
	return historicoTransacoes != null ? ResponseEntity.ok().body(historicoTransacoes) : ResponseEntity.notFound().build();
    }
    
    @GetMapping(value = "/consulta-extrato/{agencia}/{numeroConta}", produces = {"application/json"})
    public @ResponseBody ResponseEntity<List<Extrato>> consultaExtratoPorAgenciaAndNumeroConta(
	    final @PathVariable String agencia, String numeroConta) {
	List<Extrato> historicoTransacoes = extratoService.consultaExtratoPorAgenciaAndNumeroConta(agencia, numeroConta);
	return historicoTransacoes != null ? ResponseEntity.ok().body(historicoTransacoes) : ResponseEntity.notFound().build();
    }

}
