package com.indracompany.treinamento.model.repository;

import java.util.List;

import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Transacao;

public interface TransacaoRepository extends GenericCrudRepository<Transacao, Long>{
	
	List<Transacao> findByConta(Conta con);
}
