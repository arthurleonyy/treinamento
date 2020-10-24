package com.indracompany.treinamento.model.repository;

import java.util.Optional;

import com.indracompany.treinamento.model.entity.Cliente;

public interface ClienteRepository extends GenericCrudRepository<Cliente, Long> {

	Cliente findByCpf(String cpf);
	Optional<Cliente> findByEmail(String email);
	Optional<Cliente> findById(Long id);

	Cliente findByNome(String nome);
	

}
