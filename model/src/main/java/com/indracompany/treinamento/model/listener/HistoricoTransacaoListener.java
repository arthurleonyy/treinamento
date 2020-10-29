package com.indracompany.treinamento.model.listener;

import java.time.LocalDateTime;
import java.time.ZoneId;

import javax.persistence.PrePersist;

import com.indracompany.treinamento.model.entity.HistoricoTransacao;

public class HistoricoTransacaoListener {
    
    @PrePersist
    protected void onCreate(HistoricoTransacao historicoTransacao) {
	
	LocalDateTime hoje = LocalDateTime.now(ZoneId.of("America/Sao_Paulo"));
	historicoTransacao.setOnCreate(hoje);
    }

}
