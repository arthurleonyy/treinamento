package com.indracompany.treinamento.model.repository;

import com.indracompany.treinamento.model.entity.Cliente;

public interface ClienteRepository extends GenericCrudRepository<Cliente, Long> {

	public Cliente findByEmail(String email);
	
	public Cliente findByCpf(String cpf);
	
	
}
