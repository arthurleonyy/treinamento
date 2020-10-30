package com.indracompany.treinamento.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.service.ExtratoService;

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/extrato")
public class ExtratoRest {

    @Autowired
    private ExtratoService transacaoService;

    @RequestMapping(value = "/consulta-extrato-por-conta/{contaId}", method = RequestMethod.GET, produces = {
	    MediaType.APPLICATION_JSON_VALUE })
    public @ResponseBody ResponseEntity<List<Extrato>> mostrarHistoricoTransacaoPorConta(final @PathVariable Long contaId) {
	List<Extrato> historicoTransacoes = transacaoService.mostrarExtratoPorConta(contaId);
	return historicoTransacoes != null ? ResponseEntity.ok().body(historicoTransacoes) : ResponseEntity.notFound().build();
    }
    
    @RequestMapping(value = "/consulta-extrato/{agencia}/{numeroConta}", method = RequestMethod.GET, produces = {
	    MediaType.APPLICATION_JSON_VALUE })
    public @ResponseBody ResponseEntity<List<Extrato>> mostrarExtratoPorAgenciaAndNumeroConta(
	    final @PathVariable String agencia, String numeroConta) {
	List<Extrato> historicoTransacoes = transacaoService.mostrarExtratoPorAgenciaAndNumeroConta(agencia, numeroConta);
	return historicoTransacoes != null ? ResponseEntity.ok().body(historicoTransacoes) : ResponseEntity.notFound().build();
    }
}
