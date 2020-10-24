package com.indracompany.treinamento.model.repository;

import org.springframework.transaction.annotation.Transactional;

import com.indracompany.treinamento.model.entity.Cliente;

public interface ClienteRepository extends GenericCrudRepository<Cliente, Long> {

	Cliente findByCpf(String cpf);
	
	Cliente findByNome(String nome);
	
	@Transactional
	void deleteByCpf(String cpf);

}
