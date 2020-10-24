package com.indracompany.treinamento.model.service;

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
	
	public Cliente buscarClientePorCpf(String cpf) {
		if (!CpfUtil.validaCPF(cpf)){
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CPF_INVALIDO);
		}
		return clienteRepository.findByCpf(cpf);
	}
	
	public Cliente buscarClientePorNome(String nome) {
		return clienteRepository.findByNome(nome);
<<<<<<< HEAD
=======
	}
	
	private boolean cpfEhValido(String cpf) {
		return CpfUtil.validaCPF(cpf);
>>>>>>> ce065ff95afefa915c983dc6ce34288838b1b36f
	}
	
	public void removerClientePorCpf(String cpf) {
//		if (!CpfUtil.validaCPF(cpf)){
//			throw new AplicacaoException(ExceptionValidacoes.ERRO_CPF_INVALIDO);
//		}
		try{
			clienteRepository.deleteByCpf(cpf);
		} catch (AplicacaoException e) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_EXCLUSAO_GENERICO);
		}
	}
}
