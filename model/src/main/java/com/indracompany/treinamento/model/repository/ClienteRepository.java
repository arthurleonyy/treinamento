package com.indracompany.treinamento.model.repository;

import java.util.List;

import com.indracompany.treinamento.model.entity.Cliente;

public interface ClienteRepository extends GenericCrudRepository<Cliente, Long> {

	// MÉTODO GET EM UM ÚNICO ELEMENTO
	Cliente findByCpf(String cpf);
	// MÉTODO GET EM UMA LISTA DE ELEMENTOS
	List<Cliente> findByAtivo (boolean ativo);
	
	// MÉTODO DELETE 
	//Cliente deleteByCpf(String cpf);

}
