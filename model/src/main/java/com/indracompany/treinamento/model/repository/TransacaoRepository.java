package com.indracompany.treinamento.model.repository;



import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Transacao;

@Repository
@Transactional(readOnly = false)
public interface TransacaoRepository extends GenericCrudRepository<Transacao, Long> {
	
	
	@Query (value = "select * from extrato where tipoDeConta = 'CORRENTE'", nativeQuery = true)
	List<Transacao> findByConta(Conta conta);
		
	
		
		
	}
		

	

