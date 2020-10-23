package com.indracompany.treinamento.model.repository;

import java.util.List;
import java.util.Optional;

import com.indracompany.treinamento.model.entity.Cliente;

public interface ClienteRepository extends GenericCrudRepository<Cliente, Long> {
    
	Cliente findByCpf(String cpf);
	
	List<Cliente> findByNomeStartsWith(String nome);

	Cliente findByEmail(String email);

	

	
	
}
