package com.indracompany.treinamento.model.service;

/**
 * @author rhamon
 */
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.entity.TipoOperacao;
import com.indracompany.treinamento.model.repository.ExtratoRepository;

@Service
public class ExtratoService extends GenericCrudService<Extrato, Long, ExtratoRepository> {

	@Autowired
	private ContaService contaService;

	@Autowired
	private ExtratoRepository extratoRepository;

	public void imprimirExtrato(Conta conta, double valor, TipoOperacao tipoOperacao) {

		Extrato extr = new Extrato();

		extr.setConta(conta);
		extr.setTipoOperacao(tipoOperacao);
		extr.setValor(valor);
		extr.setData(LocalDateTime.now());
		this.salvar(extr);
	}

	public List<Extrato> consultarExtratosDaConta(String agencia, String numeroConta) {
		Conta conta = contaService.carregarContaPorNumero(agencia, numeroConta);
		if (conta != null) {
			return extratoRepository.findByConta(conta);
		}

		return extratoRepository.findAll();
	}

}
