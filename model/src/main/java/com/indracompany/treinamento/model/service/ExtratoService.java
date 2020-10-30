package com.indracompany.treinamento.model.service;

import java.time.OffsetDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.repository.ExtratoRepository;
import com.indracompany.treinamento.util.TipoTransacao;

@Service
public class ExtratoService extends GenericCrudService<Extrato, Long, ExtratoRepository> {

	@Autowired
	private ExtratoRepository extratoRepository;

	public List<Extrato> buscarExtratoConta(Long id) {

		List<Extrato> extrato = extratoRepository.findByContaId(id);
		if (extrato.isEmpty()) {
			throw new AplicacaoException(ExceptionValidacoes.ALERTA_NENHUM_REGISTRO_ENCONTRADO);
		}
		return extratoRepository.findByContaId(id);
	}

	public void salvarExtrato(double saldoAnterior, double valor,  TipoTransacao tipo, Conta conta) {
		Extrato extrato = new Extrato(OffsetDateTime.now(),  saldoAnterior, valor, conta.getSaldo(), tipo,
				conta);
		salvar(extrato);
	}

	/*
	 * public static List<ExtratoDTO> converter(List<Extrato> extrato) { return
	 * extrato.stream().map(ExtratoDTO::new).collect(Collectors.toList()); }
	 */
}
