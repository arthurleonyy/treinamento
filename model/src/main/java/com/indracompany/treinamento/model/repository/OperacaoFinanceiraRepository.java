package com.indracompany.treinamento.model.repository;

import java.util.List;

import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.OperacaoFinanceira;

public interface OperacaoFinanceiraRepository extends GenericCrudRepository<OperacaoFinanceira, Long> {

	List<OperacaoFinanceira> findByContaOrderByDataHoraOperacaoDesc(Conta conta);
	
	List<OperacaoFinanceira> findByContaAndDataHoraOperacaoBetweenOrderByDataHoraOperacaoDesc(Conta conta, String inicio, String fim);
	
}
