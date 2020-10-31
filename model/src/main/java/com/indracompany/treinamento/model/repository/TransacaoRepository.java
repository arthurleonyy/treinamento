package com.indracompany.treinamento.model.repository;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.indracompany.treinamento.model.entity.Transacao;
import com.indracompany.treinamento.model.entity.Conta;

public interface TransacaoRepository extends GenericCrudRepository<Transacao, Long>{
	
	List<Transacao> findByConta(Conta conta);
	
	@Query(value = "INSERT INTO Transacoes (data, descricao, valor, fk_conta_id) VALUES (:data, :descricao, :valor, :conta) ", nativeQuery = true)
	void registarSql(@Param("data")  Calendar data,@Param("descricao")  String descricao, @Param("conta")  Conta conta, @Param("valor")  Double valor);
}
