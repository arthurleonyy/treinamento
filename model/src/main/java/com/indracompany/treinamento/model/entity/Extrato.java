package com.indracompany.treinamento.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.indracompany.treinamento.model.listener.ExtratoListener;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@EntityListeners(ExtratoListener.class)
@EqualsAndHashCode(callSuper = true)
@Table(name = "extrato")
public class Extrato extends GenericEntity<Long> {

    private static final long serialVersionUID = -647957443392837290L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo;

    private String descricao;

    private Double valor;

    @ManyToOne(optional = false)
    @JoinColumn(name = "conta_id")
    private Conta conta;
    
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDateTime onCreate;
    
    public Extrato(Conta conta, String tipo, String descricao, Double valor) {
        this.conta = conta;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

}
