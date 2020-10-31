package com.indracompany.treinamento.model.repository;

<<<<<<< HEAD
import java.util.Optional;
=======
import java.util.List;
>>>>>>> 4cbd62a0c547da997a8471a2203bf6043970123a

import com.indracompany.treinamento.model.entity.Cliente;

public interface ClienteRepository extends GenericCrudRepository<Cliente, Long> {

	Cliente findByCpf(String cpf);
	
<<<<<<< HEAD
	Optional<Cliente> findById(Long id);
=======
	List<Cliente> findByNomeStartsWith(String nome);

	Cliente findByEmail(String email);
>>>>>>> 4cbd62a0c547da997a8471a2203bf6043970123a

	Optional<Cliente> findByNome(String nome);
	
	Optional<Cliente> findByEmail(String email);
	
	
}
