package com.indracompany.treinamento.model.service;

<<<<<<< Updated upstream
=======
import java.util.List;

>>>>>>> Stashed changes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.repository.ClienteRepository;
import com.indracompany.treinamento.util.CpfUtil;

@Service
public class ClienteService extends GenericCrudService<Cliente, Long, ClienteRepository> {
	
	@Autowired
	private ClienteRepository clienteRepository;
	
<<<<<<< Updated upstream
=======
	//Serviço para buscar cliente por CPF
>>>>>>> Stashed changes
	public Cliente buscarClientePorCpf(String cpf) {
		if (!cpfEhValido(cpf)){
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CPF_INVALIDO);
		}
		return clienteRepository.findByCpf(cpf);
	}
	
<<<<<<< Updated upstream
=======
	//Serviço para validar CPF buscando de -> com.indracompany.treinamento.util.CpfUtil;
>>>>>>> Stashed changes
	private boolean cpfEhValido(String cpf) {
		return CpfUtil.validaCPF(cpf);
	}
	
<<<<<<< Updated upstream
	public Cliente buscarClientePorNome(String nome) {

			//throw new AplicacaoException(ExceptionValidacoes.ERRO_NOME_INVALIDO);
			return clienteRepository.findByNome(nome);
	}
	

=======
	//Serviço para buscar cliente por Nome
	public Cliente buscarClientePorNome(String nome) {
		return clienteRepository.findByNome(nome);
	}
	
	//Serviço para buscar clientes ativos
	public List<Cliente> buscarClientePorAtivo(boolean ativo) {
		return clienteRepository.findByAtivo(ativo);
	}
	
	//Serviço para buscar lista de clientes por nome
	public List<Cliente> buscarListaDeClientePorNome(String nome) {
		return clienteRepository.findByNomeLike(nome);
	}
	
>>>>>>> Stashed changes
}
