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

import com.indracompany.treinamento.model.entity.HistoricoTransacao;
import com.indracompany.treinamento.model.service.HistoricoTransacaoService;

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("rest/extrato")
public class HistoricoTransacaoRest {

    @Autowired
    private HistoricoTransacaoService transacaoService;
    
    @RequestMapping(value = "/mostrar-extrato-por-conta/{contaId}", method = RequestMethod.GET, produces = {
	    MediaType.APPLICATION_JSON_VALUE })
    public @ResponseBody ResponseEntity<List<HistoricoTransacao>> mostrarHistoricoTransacaoPorConta(final @PathVariable Long contaId) {
	List<HistoricoTransacao> historicoTransacoes = transacaoService.mostrarTransacaoPorConta(contaId);
	return historicoTransacoes != null ? ResponseEntity.ok().body(historicoTransacoes) : ResponseEntity.notFound().build();
    }
}
