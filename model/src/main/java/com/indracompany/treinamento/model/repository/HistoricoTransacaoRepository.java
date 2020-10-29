package com.indracompany.treinamento.model.repository;

import org.springframework.stereotype.Repository;

import com.indracompany.treinamento.model.entity.HistoricoTransacao;

@Repository
public interface HistoricoTransacaoRepository extends GenericCrudRepository<HistoricoTransacao, Long>{
    
}
