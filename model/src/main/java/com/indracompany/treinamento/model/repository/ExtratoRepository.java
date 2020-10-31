package com.indracompany.treinamento.model.repository;


import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Extrato;

public interface ExtratoRepository extends GenericCrudRepository<Extrato, Long>{

	List<Extrato> findByConta(Conta conta);
	
	@Query(value = "select ex.* "
			+ " from extrato ex, contas con "
			+ " where ex.fk_conta_id = con.id "
			+ "	and con.num_conta = :numeroConta "
			+ " and ex.dataOperacao between :dataInicio and :dataFim order by ex.dataOperacao ", nativeQuery = true )
	List<Extrato> ListarExtratoPorConta_periodo(@Param("numeroConta") String numeroConta,
			@Param("dataInicio") String dataInicio, @Param("dataFim") String dataFim);
	
}
