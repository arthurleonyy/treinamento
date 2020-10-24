package com.indracompany.treinamento.model.repository;



import com.indracompany.treinamento.model.entity.Cliente;


public interface ClienteRepository extends GenericCrudRepository<Cliente, Long> {

<<<<<<< HEAD
	public Cliente findByEmail(String email);
	
	public Cliente findByCpf(String cpf);
	
	
=======
	Cliente findByCpf(String cpf);

	Cliente findByNome(String nome);
	

>>>>>>> ce065ff95afefa915c983dc6ce34288838b1b36f
}
