package com.indracompany.treinamento.model.service;

import java.util.List;
import java.util.Random;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.OperacaoFinanceira;
import com.indracompany.treinamento.model.repository.ContaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContaService extends GenericCrudService<Conta, Long, ContaRepository>{

	@Autowired
  private ContaRepository contaRepository;
  
  @Autowired
	private OperacaoFinanceiraService operacaoFinanceiraService;

	@Autowired
	private ClienteService clienteService;
	
	public Conta criarConta(String cpfCliente) {
		Cliente cliente = clienteService.buscarClientePorCpf(cpfCliente);
		Conta conta = new Conta();
		conta.setCliente(cliente);
		conta.setAgencia(gerarNumeroRandomicoEmString(10));
		conta.setNumeroConta(gerarNumeroRandomicoEmString(15));
		conta = contaRepository.save(conta);
		return conta;
	}
	
	public double consultarSaldo(String agencia, String numeroConta) {
		Conta conta = this.obterContaPorAgenciaENumeroConta(agencia, numeroConta);
		return conta.getSaldo();
	}
	
	public Conta obterContaPorAgenciaENumeroConta(String agencia, String numeroConta) {
		Conta conta = repository.findByAgenciaAndNumeroConta(agencia, numeroConta);
		if (conta == null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INEXISTENTE);
		}
		return conta;
	}
	
	public List<Conta> obterContasDoCliente(String cpf){
		Cliente cli = clienteService.buscarClientePorCpf(cpf);
		if (cli != null) {
			return contaRepository.findByCliente(cli);
		}
		return null;
  }
  
  public List<OperacaoFinanceira> obterOperacoesPorAgenciaENumeroConta(String agencia, String numeroConta) {
		Conta conta = obterContaPorAgenciaENumeroConta(agencia, numeroConta);
		return operacaoFinanceiraService.consultarOperacoes(conta);
	}
	
	private String gerarNumeroRandomicoEmString(int tamanho) {
		String numero = "";
		while(tamanho > 0) {
			numero = numero.concat(String.valueOf((new Random()).nextInt(9)));
			tamanho--;
		}
		return numero;
	}
}
