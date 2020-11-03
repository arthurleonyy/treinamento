package com.indracompany.treinamento.model.repository;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.indracompany.treinamento.model.entity.Transacao;
import com.indracompany.treinamento.model.entity.Conta;

public interface TransacaoRepository extends GenericCrudRepository<Transacao, Long>{
	
	List<Transacao> findByConta(Conta conta);
	
	
	
	//@Query(value = "INSERT INTO `Transacoes` (`id`, `data`, `descricao`, `valor`, `fk_conta_id`) VALUES (NULL, NOW(), :descricao, :valor, :conta) ", nativeQuery = true)
	//void registarSql(@Param("descricao")  String descricao, @Param("conta")  Conta conta, @Param("valor")  Double valor);
	
	//void registarSql(@Param("data")  Date data,@Param("descricao")  String descricao, @Param("conta")  Conta conta, @Param("valor")  Double valor);
}
