package com.indracompany.treinamento.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.Conta;

public interface ContaRepository extends GenericCrudRepository<Conta, Long> {

  List<Conta> findByCliente(Cliente cli);

  @Query("SELECT c"
      + " FROM Conta c"
      + " WHERE c.numeroAgencia = :numeroAgencia"
      + " AND c.numeroConta = :numeroConta")
  Conta findByNumeroAgenciaAndNumeroConta(@Param("numeroAgencia") String numeroAgencia, @Param("numeroConta") String numeroConta);

  @Query("select c from Conta c where c.cliente = :cli")
  List<Conta> buscarContasDoClienteJpql(@Param("cli") Cliente cli);

  @Query("select c from Conta c where c.numeroAgencia = :agencia and c.numeroConta = :numeroConta")
  Conta consultarContaJpql(@Param("agencia") String agencia, @Param("numeroConta") String numeroConta);

  @Query(value = "select con.* "
      + " from clientes cli, contas con "
      + " where cli.id = con.fk_cliente_id "
      + "	and cli.fk_cliente_id = :idCliente", nativeQuery = true)
  List<Conta> buscarContasDoClienteSql(@Param("idCliente") Long idCliente);

  @Query(value = "select * "
      + " from contas "
      + " where num_agencia = :agencia "
      + " and num_conta = :numeroConta ", nativeQuery = true)
  Conta consultarContaSql(@Param("agencia") String agencia, @Param("numeroConta") String numeroConta);

}
