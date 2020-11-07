package com.indracompany.treinamento.model.repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.indracompany.treinamento.model.entity.Conta;
import com.indracompany.treinamento.model.entity.MovimentacaoConta;

@Repository
public interface MovimentacaoContaRepository extends GenericCrudRepository<MovimentacaoConta, Long> {

  @Query("SELECT movConta"
      + " FROM MovimentacaoConta movConta"
      + " WHERE movConta.conta = :conta")
  List<MovimentacaoConta> findMovimentacaoContaByConta(@Param("conta") Conta conta);

}
