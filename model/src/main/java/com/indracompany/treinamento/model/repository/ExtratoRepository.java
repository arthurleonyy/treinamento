package com.indracompany.treinamento.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.indracompany.treinamento.model.entity.Extrato;

@Repository
public interface ExtratoRepository extends GenericCrudRepository<Extrato, Long> {
    
    @Query(value = "select * from extrato ex where ex.conta_id = ?1", nativeQuery = true)
    List<Extrato> findByContaId(Long contaId);   
    
    @Query(value = "select * "
		+ " from extrato ex, conta c "
		+ " where ex.conta_id = c.id "
		+ " and c.agencia = :agencia"
		+ " and c.numeroConta = :numeroConta ", nativeQuery = true )
    List<Extrato> findByAgenciaAndNumeroConta(String agencia, String numeroConta);
    
}
