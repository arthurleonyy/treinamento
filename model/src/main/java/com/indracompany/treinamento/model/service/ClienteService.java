package com.indracompany.treinamento.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.repository.ClienteRepository;
import com.indracompany.treinamento.validator.CpfValidator;
import com.indracompany.treinamento.validator.EmailValidator;

@Service
public class ClienteService extends GenericCrudService<Cliente, Long, ClienteRepository> {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente buscarClientePorCpf(String cpf) {
	hasCpfValido(cpf);
	return clienteRepository.findByCpf(cpf);
    }

    public Cliente buscarClientePorNome(String nome) {
	return clienteRepository.findByNome(nome);
    }

    public Cliente buscarPorEmail(String email) {
	hasEmailValido(email);
	return clienteRepository.findByEmail(email);
    }

    public void atualizarPropriedadeAtivo(Long id, Boolean ativo) {
	Cliente cliente = super.buscar(id);
	cliente.setAtivo(ativo);
	clienteRepository.save(cliente);
    }

    @Override
    public Cliente salvar(Cliente cliente) {
	cliente.setCpf(CpfValidator.remove(cliente.getCpf()));
	hasCpfValido(cliente.getCpf());
	cpfExiste(cliente);
	hasEmailValido(cliente.getEmail());
	emailExiste(cliente);
	return super.salvar(cliente);
    }

    private boolean emailEhValido(String mail) {
	return EmailValidator.isValidoEmail(mail);
    }

    private void hasEmailValido(String email) {
	if (!emailEhValido(email)) {
	    throw new AplicacaoException(EmailValidator.EMAIL_INVALIDO);
	}
    }
    
    private void emailExiste(Cliente cliente) {
	String email = cliente.getEmail();
	if (clienteRepository.existsByEmail(email) && emailEhValido(email)) {
	    throw new AplicacaoException(ExceptionValidacoes.ERRO_EMAIL_JA_EXISTE);
	}
    }

    private void hasCpfValido(String cpf) {
	if (!CpfValidator.isValid(cpf)) {
	    throw new AplicacaoException(ExceptionValidacoes.ERRO_CPF_INVALIDO);
	}
    }

    private void cpfExiste(Cliente cliente) {
	String cpf = cliente.getCpf();
	if (clienteRepository.existsByCpf(cpf)) {
	    throw new AplicacaoException(ExceptionValidacoes.ERRO_CPF_CLIENTE_JA_EXISTE);
	}
    }

}
