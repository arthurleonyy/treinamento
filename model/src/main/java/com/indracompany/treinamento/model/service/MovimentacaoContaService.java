package com.indracompany.treinamento.model.service;

import java.math.BigDecimal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.indracompany.treinamento.enums.OrigemMensagemEnum;
import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.MovimentacaoConta;
import com.indracompany.treinamento.model.repository.MovimentacaoContaRepository;
import com.indracompany.treinamento.util.Messages;

@Service
public class MovimentacaoContaService extends GenericCrudService<MovimentacaoConta, Long, MovimentacaoContaRepository> {

  private MovimentacaoContaRepository movimentacaoContaRepository;

  @Autowired
  public MovimentacaoContaService(MovimentacaoContaRepository movimentacaoContaRepository) {
    super();
    this.movimentacaoContaRepository = movimentacaoContaRepository;
  }

  public List<MovimentacaoConta> recuperaMovimentacaoDaConta(Conta conta) {
    List<MovimentacaoConta> movimentacoesConta = movimentacaoContaRepository.findMovimentacaoContaByConta(conta);
    if (movimentacoesConta == null) {
      throw new AplicacaoException(ExceptionValidacoes.ERRO_MOVIMENTACOES_NAO_ENCONTRADAS);
    }
    return movimentacoesConta;
  }

  public void registroDeMovimentacaoDaConta(Conta conta, BigDecimal valor, OrigemMensagemEnum origem) {
    MovimentacaoConta movimentacao = new MovimentacaoConta();
    movimentacao.setConta(conta);
    movimentacao.setValorMovimentacao(valor);
    movimentacao.setHistoricoMovimentacao(Messages.montaMensagens(origem, conta));
    this.salvar(movimentacao);
  }

}
