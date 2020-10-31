package com.indracompany.treinamento.model.repository;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Transacao;

public interface TransacaoRepository extends GenericCrudRepository<Transacao, Long>{

//	List<Transacao> findByTransacao(Transacao transacao);
//
//	List<Transacao> findByContaAndDataOperacaoLike(Conta conta, String data);

	public Optional<List<Transacao>> findAllByConta(Conta conta);
	
//	@Query(value = "select ex.* "
//			+ " from transacao ex, contas con "
//			+ " where ex.fk_conta_id = con.id "
//			+ "	and con.num_conta = :numeroConta "
//			+ " and ex.dataOperacao between :dataInicio and :dataFim ", nativeQuery = true )
//	List<Transacao> ListarTransacaoPorConta_periodo(@Param("numeroConta") String numeroConta,
//			@Param("dataInicio") String dataInicio, @Param("dataFim") String dataFim);
    
}
