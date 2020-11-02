package com.indracompany.treinamento.model.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Extrato;

public interface ExtratoRepository extends GenericCrudRepository<Extrato ,Long> {
	
	List<Extrato> findByConta(Conta conta);
	
	@Query(value = "INSERT INTO Extrato (data, descricao, valor, fk_conta_id)"
			+ " VALUES (:data, :descricao, :valor, :conta) ", nativeQuery = true)
			void salva(@Param("data")  Date data,@Param("descricao")  String descricao, @Param("conta")
			Conta conta, @Param("valor")  Double valor);
	
	
	
	
}