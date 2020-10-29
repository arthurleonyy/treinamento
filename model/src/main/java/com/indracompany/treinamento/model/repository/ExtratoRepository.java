package com.indracompany.treinamento.model.repository;

import java.util.List;

import com.indracompany.treinamento.model.entity.Extrato;

public interface ExtratoRepository extends GenericCrudRepository<Extrato ,Long> {
	
	List<Extrato> findByContaAgenciaAndContaNumeroConta (String agencia , String numeroConta);
	
	List<Extrato> findByContaAgenciaAndContaNumeroContaOrderByDataHoraAsc (String agencia , String numeroConta);

	
	

}
