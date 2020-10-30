package com.indracompany.treinamento.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.repository.ExtratoRepository;

@Service
public class ExtratoService
	extends GenericCrudService<Extrato, Long, ExtratoRepository> {

    @Autowired
    private ExtratoRepository extratoRepository;

    public List<Extrato> mostrarExtratoPorConta(Long contaId) {
	List<Extrato> transacoes = new ArrayList<>();
	for (Extrato extrato : extratoRepository.findByContaId(contaId)) {
	    if (extrato != null) {
		transacoes.add(extrato);
	    }
	}

	return transacoes;
    }

    public List<Extrato> mostrarExtratoPorAgenciaAndNumeroConta(String agencia, String numeroConta) {
	return extratoRepository.findByAgenciaAndNumeroConta(agencia, numeroConta);
    }

}
