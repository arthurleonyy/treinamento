package com.indracompany.treinamento.util.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class AutenticacaoListener implements ApplicationListener<AuthenticationSuccessEvent> {

	private static final Logger log = LoggerFactory.getLogger(AutenticacaoListener.class);

	@Override
	public void onApplicationEvent(AuthenticationSuccessEvent appEvent) {
		UserDetails userDetails = (UserDetails) appEvent.getAuthentication().getPrincipal();
		log.info("usuario {} autenticado com sucesso.", userDetails.getUsername());
	}
}
