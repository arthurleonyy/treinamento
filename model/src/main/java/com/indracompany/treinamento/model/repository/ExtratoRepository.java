package com.indracompany.treinamento.model.repository;


<<<<<<< HEAD
import java.util.Date;
=======
>>>>>>> 22f78f795b4061ea60aa8ed20d09ab7fe78845cd
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Extrato;

public interface ExtratoRepository extends GenericCrudRepository<Extrato, Long>{

	List<Extrato> findByConta(Conta conta);
<<<<<<< HEAD
=======

	List<Extrato> findByContaAndDataOperacaoLike(Conta conta, String data);
>>>>>>> 22f78f795b4061ea60aa8ed20d09ab7fe78845cd
	
	@Query(value = "select ex.* "
			+ " from extrato ex, contas con "
			+ " where ex.fk_conta_id = con.id "
			+ "	and con.num_conta = :numeroConta "
<<<<<<< HEAD
			+ " and ex.dataOperacao between :dataInicio and :dataFim order by ex.dataOperacao ", nativeQuery = true )
=======
			+ " and ex.dataOperacao between :dataInicio and :dataFim ", nativeQuery = true )
>>>>>>> 22f78f795b4061ea60aa8ed20d09ab7fe78845cd
	List<Extrato> ListarExtratoPorConta_periodo(@Param("numeroConta") String numeroConta,
			@Param("dataInicio") String dataInicio, @Param("dataFim") String dataFim);
	
}
