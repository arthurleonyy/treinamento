package com.indracompany.treinamento.model.repository;

import java.util.Optional;
import java.util.List;


import com.indracompany.treinamento.model.entity.Cliente;

public interface ClienteRepository extends GenericCrudRepository<Cliente, Long> {

	Cliente findByCpf(String cpf);
	

	Optional<Cliente> findById(Long id);

	List<Cliente> findByNomeStartsWith(String nome);

	Optional<Cliente> findByNome(String nome);
	
	Optional<Cliente> findByEmail(String email);
	
	
}
