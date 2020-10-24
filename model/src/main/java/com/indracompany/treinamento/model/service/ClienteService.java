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
	if (!CpfValidator.isValid(cpf)) {
	    throw new AplicacaoException(ExceptionValidacoes.ERRO_CPF_INVALIDO);
	}

	return clienteRepository.findByCpf(cpf);
    }

    public Cliente buscarClientePorNome(String nome) {
	return clienteRepository.findByNome(nome);
    }

    public Cliente buscarPorEmail(String email) {
	if (!emailEhValido(email)) {
	    throw new AplicacaoException(EmailValidator.EMAIL_INVALIDO);
	}
	return clienteRepository.findByEmail(email);
    }

    public void atualizarPropriedadeAtivo(Long id, Boolean ativo) {
	Cliente cliente = super.buscar(id);
	cliente.setAtivo(ativo);
	clienteRepository.save(cliente);
    }

    private boolean emailEhValido(String mail) {
	return EmailValidator.isValidoEmail(mail);
    }

}
