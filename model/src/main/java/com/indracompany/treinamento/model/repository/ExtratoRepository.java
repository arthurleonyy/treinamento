package com.indracompany.treinamento.model.repository;

import java.time.LocalDateTime;

import com.indracompany.treinamento.model.entity.Extrato;

public interface ExtratoRepository extends GenericCrudRepository<Extrato, Long> {

//	@Query(value = "select ex.* from Extrato ex, contas con"
//			+ " where ex.data_transacao =: data and "
//			+ "ex.fk_conta_id =: con.id", nativeQuery = true)
	
	Extrato findByData(LocalDateTime data);
}
