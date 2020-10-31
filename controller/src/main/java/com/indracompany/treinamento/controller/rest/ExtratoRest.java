package com.indracompany.treinamento.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.service.ExtratoService;

@RestController()
@RequestMapping("/extrato")
public class ExtratoRest {
	
	@Autowired
	private ExtratoService es;

	@GetMapping("/visualizar/{id}")
	public ResponseEntity<List<Extrato>> visualizarExtratos(@PathVariable Long id){
		List<Extrato> extratos = es.visualizarExtratos(id);
		return ResponseEntity.ok(extratos);
	}
	
}
