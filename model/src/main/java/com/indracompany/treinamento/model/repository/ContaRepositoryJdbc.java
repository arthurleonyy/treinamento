package com.indracompany.treinamento.model.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.indracompany.treinamento.model.entity.Conta;

@Repository
public class ContaRepositoryJdbc {
	

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public List<Conta> buscarContas(String agencia, String numeroConta){
		StringBuilder sql = new StringBuilder("select c.* from Contas c where 1=1 ");

		if (agencia != null) {
			sql.append(" and c.agencia = '"+agencia+"'");
		}

		if (numeroConta != null) {
			sql.append(" and c.num_conta = '"+numeroConta+"'");
		}
		return jdbcTemplate.query(sql.toString(), new ContaRowMapper());
	}


	private class ContaRowMapper implements RowMapper<Conta> {

		@Override
		public Conta mapRow(ResultSet rs, int rowNum) throws SQLException {

			Conta conta = new Conta();
			conta.setId(rs.getLong("id"));
			conta.setAgencia(rs.getString("agencia"));
			conta.setNumeroConta(rs.getString("num_conta"));

			return conta;
		}
	}


}
