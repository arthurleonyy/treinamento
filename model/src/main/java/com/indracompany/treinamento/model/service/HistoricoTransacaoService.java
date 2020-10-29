package com.indracompany.treinamento.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.model.entity.HistoricoTransacao;
import com.indracompany.treinamento.model.repository.HistoricoTransacaoRepository;

@Service
public class HistoricoTransacaoService extends GenericCrudService<HistoricoTransacao, Long, HistoricoTransacaoRepository> {

    @Autowired
    private HistoricoTransacaoRepository transacaoRepository;

    public List<HistoricoTransacao> mostrarTransacaoPorConta(Long contaId) {
	List<HistoricoTransacao> transacoes = new ArrayList<>();
	for (HistoricoTransacao extrato : transacaoRepository.findByContaId(contaId)) {
	    if (extrato != null) {
		transacoes.add(extrato);
	    }
	}
	return transacoes;
    }
    
}
