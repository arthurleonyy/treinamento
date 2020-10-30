package com.indracompany.treinamento.model.repository;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import com.indracompany.treinamento.model.entity.MovimentoConta;

@Repository
public interface MovimentoContaRepository extends GenericCrudRepository<MovimentoConta, Long> {
	
	 @Query(value = "select * from movimentocontas mc where mc.fk_conta_id =:contaId", nativeQuery = true)
	 List<MovimentoConta> findByContaId(Long contaId); 
	 
     @Query(value = "select * "
				+ " from movimentocontas mc, contas c "
				+ " where mc.fk_conta_id = c.id "
				+ " and c.agencia = :agencia"
				+ " and c.num_conta = :numeroConta ", nativeQuery = true )
	 List<MovimentoConta> findByAgenciaAndNumeroConta(String agencia, String numeroConta);
     
}
