package com.indracompany.treinamento.model.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.repository.ContaRepository;
import com.indracompany.treinamento.model.repository.ExtratoRepository;

@Service
public class ExtratoService extends GenericCrudService<Extrato, Long, ExtratoRepository>{
	LocalDateTime dataHora = LocalDateTime.now();
	
	@Autowired
	private ExtratoRepository extratoRepository;
	
	@Autowired
	private ClienteService clienteService;

	public void extratoSaque(Conta conta, double valor) {
		Extrato extrato = new Extrato();
		extrato.setValor(valor);
		extrato.setContaId(conta.getId());
		extrato.setOperacao("SAQUE");
		extrato.setData(dataHora);
		extrato.setAgencia(conta.getAgencia());
		extrato.setNumeroConta(conta.getNumeroConta());
		this.salvar(extrato);
	}
	
	public void extratoDeposito(Conta conta, double valor) {
		Extrato extrato = new Extrato();
		extrato.setValor(valor);
		extrato.setContaId(conta.getId());
		extrato.setOperacao("DEPOSITO");
		extrato.setData(dataHora);
		extrato.setAgencia(conta.getAgencia());
		extrato.setNumeroConta(conta.getNumeroConta());
		this.salvar(extrato);
	}

	public void extratoTransferencia(Conta contaOrigem, Conta contaDestino, double valor) {				
		Extrato extrato = new Extrato();		
		extrato.setValor(valor);
		extrato.setContaId(contaOrigem.getId());
		extrato.setOperacao("TRANSFERENCIA_REALIZADA");
		extrato.setData(dataHora);
		extrato.setAgencia(contaOrigem.getAgencia());
		extrato.setNumeroConta(contaOrigem.getNumeroConta());
		this.salvar(extrato);	
		
		Extrato extratoDestino = new Extrato();
		extratoDestino.setValor(valor);
		extratoDestino.setContaId(contaDestino.getId());
		extratoDestino.setOperacao("TRANSFERENCIA_RECEBIDA");
		extratoDestino.setData(dataHora);
		extratoDestino.setAgencia(contaDestino.getAgencia());
		extratoDestino.setNumeroConta(contaDestino.getNumeroConta());
		this.salvar(extratoDestino);
	}
	
	public List<Extrato> buscarPorAgenciaConta (String agencia, String conta) {
		List<Extrato> extrato = extratoRepository.findByAgenciaAndNumeroConta(agencia, conta);
		return extrato;
	}
	
}
