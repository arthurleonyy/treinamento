package com.indracompany.treinamento.controller.bean;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.indracompany.treinamento.config.ViewScope;
import com.indracompany.treinamento.model.entity.ParametroSistema;
import com.indracompany.treinamento.model.service.ParametroSistemaService;

@Controller("parametroSistema")
@Scope(value = ViewScope.VALUE)
public class ParametroSistemaBean extends GenericCrudBean<ParametroSistema, Long, ParametroSistemaService>{





}
