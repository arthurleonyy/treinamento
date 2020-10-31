package com.indracompany.treinamento.model.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Extrato;

public interface ExtratoRepository extends GenericCrudRepository<Extrato, Long>{
		
	@Query(value = "select * from extratos ext, contas c where c.agencia = :agencia "
					+ "and c.num_conta = :numeroConta and ext.fk_conta_id = c.id", nativeQuery = true)
	List<Extrato> findByAgenciaAndNumeroConta(String agencia, String numeroConta);
	
	@Query(value = "select * from extratos ext where ext.data BETWEEN :dataInicial and :dataFinal", nativeQuery = true)
	List<Extrato> findByIntervalDate(String dataInicial, String dataFinal);
	
	@Query(value = "select * from extratos ext, contas c where c.agencia = :agencia "
			+ "and c.num_conta = :numeroConta and ext.fk_conta_id = c.id and ext.data BETWEEN :dataInicial and :dataFinal", nativeQuery = true)
	List<Extrato> findByAccountAndIntervalDate(String agencia, String numeroConta, String dataInicial, String dataFinal);
	
	
}
