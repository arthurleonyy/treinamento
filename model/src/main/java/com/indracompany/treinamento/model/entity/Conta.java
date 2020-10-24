package com.indracompany.treinamento.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "conta")
@EqualsAndHashCode(callSuper = true)
public class Conta extends GenericEntity<Long> {

    private static final long serialVersionUID = 8911504777617021650L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "agencia", length = 10, nullable = false)
    private String agencia;

    @Column(name = "numeroConta", length = 15, nullable = false)
    private String numeroConta;

    @ManyToOne
    @JoinColumn(name = "fk_cliente_id", nullable = false)
    private Cliente cliente;

    @Column(name = "saldo")
    private double saldo;

}
