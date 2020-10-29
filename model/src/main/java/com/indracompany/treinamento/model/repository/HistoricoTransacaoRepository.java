package com.indracompany.treinamento.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.indracompany.treinamento.model.entity.HistoricoTransacao;

@Repository
public interface HistoricoTransacaoRepository extends GenericCrudRepository<HistoricoTransacao, Long> {
    
    @Query(value = "select * from extrato ex where ex.conta_id = ?1", nativeQuery = true)
    List<HistoricoTransacao> findByContaId(Long contaId);   
}
