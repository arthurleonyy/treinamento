package com.indracompany.treinamento.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.repository.ClienteRepository;

@Service
public class ClienteService extends GenericCrudService<Cliente, Long, ClienteRepository> {
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	public Cliente buscarClientePorCpf(String cpf) {
		if (cpfEhValido(cpf)){
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CPF_INVALIDO);
		}
		return clienteRepository.findByCpf(cpf);
	}

	private boolean cpfEhValido(String cpf) {
		// TODO Auto-generated method stub
		return false;
	}

	public List<Cliente> buscarClientePorNome (String nome ) {
		return this.clienteRepository.findByNome(nome); 
	}
	 
	public Cliente buscarClientePorEmail (String email ) {
		return this.clienteRepository.findByEmail(email);
	
	}
	

}
