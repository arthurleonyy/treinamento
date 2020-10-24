package com.indracompany.treinamento.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.repository.ClienteRepository;
import com.indracompany.treinamento.util.CpfUtils;

@Service
public class ClienteService extends GenericCrudService<Cliente, Long, ClienteRepository> {

	@Autowired
	private ClienteRepository cr;
	
	public Cliente buscarEmail(String email){
		
		Cliente cliente  = cr.findByEmail(email);
		 return cliente; 
		
	}
	
	
	/*
	 * public Cliente buscarCpf(String cpf) {
	 * 
	 * if(!cpfIsValido(cpf)) { throw new
	 * AplicacaoException(ExceptionValidacoes.ERROR_CPF_INVALIDO); }
	 * 
	 * 
	 * Cliente cliente = cr.findByCpf(cpf); return cliente;
	 * 
	 * 
	 * }
	 * 
	 * 
	 * 
	 * private boolean cpfIsValido(String cpf) { return CpfUtils.validaCPF(cpf); }
	 */
		 
	 
}
