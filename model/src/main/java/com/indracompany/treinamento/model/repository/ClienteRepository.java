package com.indracompany.treinamento.model.repository;

import java.util.List;

import com.indracompany.treinamento.model.entity.Cliente;

public interface ClienteRepository extends GenericCrudRepository<Cliente, Long> {

	// MÉTODO GET EM UM ÚNICO ELEMENTO => CPF
	Cliente findByCpf(String cpf);
	
	// MÉTODO GET EM UMA LISTA DE ELEMENTOS => STATUS ATIVO
	List<Cliente> findByAtivo (boolean ativo);
	
	// MÉTODO GET EM NOME
	List<Cliente> findByNome (String nome);
	
	// MÉTODO DELETE 
	//Cliente deleteByCpf(String cpf);

}
