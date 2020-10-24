package com.indracompany.treinamento.model.service;

<<<<<<< HEAD


=======
>>>>>>> ce065ff95afefa915c983dc6ce34288838b1b36f
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.repository.ClienteRepository;
<<<<<<< HEAD
import com.indracompany.treinamento.util.CpfUtils;

@Service
public class ClienteService extends GenericCrudService<Cliente, Long, ClienteRepository> {

	@Autowired
	private ClienteRepository cr;
	
	public Cliente buscarEmail(String email){
		
		Cliente cliente  = cr.findByEmail(email);
		
		return cliente; 
		
	}
	
	
	
	
	  public Cliente buscarCpf(String cpf) {
	  
	  //if(!cpfIsValido(cpf)) { 
		  //throw new
	 // AplicacaoException(ExceptionValidacoes.ERROR_CPF_INVALIDO); 
	// }else {
	  
	  Cliente cliente = cr.findByCpf(cpf); 
	  return cliente; //}
	  
	  }
	  
	  
	  
	  //private boolean cpfIsValido(String cpf) { return CpfUtils.validaCPF(cpf); }
	 
	 
		 
	 
=======
import com.indracompany.treinamento.util.CpfUtil;

@Service
public class ClienteService extends GenericCrudService<Cliente, Long, ClienteRepository> {
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	public Cliente buscarClientePorCpf(String cpf) {
		if (!cpfEhValido(cpf)){
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CPF_INVALIDO);
		}
		return clienteRepository.findByCpf(cpf);
	}
	
	public Cliente buscarClientePorNome(String nome) {
		return clienteRepository.findByNome(nome);
	}
	
	private boolean cpfEhValido(String cpf) {
		return CpfUtil.validaCPF(cpf);
	}
	

>>>>>>> ce065ff95afefa915c983dc6ce34288838b1b36f
}
