package com.indracompany.treinamento.model.repository;

import java.util.List;

import com.indracompany.treinamento.model.entity.Cliente;

public interface ClienteRepository extends GenericCrudRepository<Cliente, Long> {

<<<<<<< Updated upstream
	Cliente findByCpf(String cpf);
	Cliente findByNome(String nome);
=======
	//retorna um cliente com base no cpf
	Cliente findByCpf(String cpf);

	//retorna um cliente com base no nome
	Cliente findByNome (String nome);
	
	//retorna um clientes ativos
	List<Cliente> findByAtivo (boolean ativo);
	
	//retorna uma lista de clientes onde o nome contem os carecteres informados
	List<Cliente> findByNomeLike(String nome);
	
>>>>>>> Stashed changes

}
