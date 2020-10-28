package com.indracompany.treinamento.util.security;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Component;

import com.indracompany.treinamento.model.service.UsuarioService;
import com.indracompany.treinamento.util.Constantes;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

	
	
	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private HttpServletRequest request;
	
	boolean shouldAuthenticateAgainstThirdPartySystem = true;

	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String username = authentication.getName();
		String password = authentication.getCredentials().toString();
		com.indracompany.treinamento.model.dto.UsuarioDTO user = usuarioService.login(username, password);
		
		if (user != null) {
			
			HttpSession session = request.getSession(true); 
			
			SecurityContext securityContext = SecurityContextHolder.getContext(); 
			securityContext.setAuthentication(authentication);
			session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, securityContext);
			session.setAttribute(Constantes.USUARIO_LOGADO, user);
			
			final List<GrantedAuthority> grantedAuths = new ArrayList<>();
			grantedAuths.add(new SimpleGrantedAuthority("ROLE_USER"));
			final UserDetails principal = new User(username, password, grantedAuths);
			final Authentication auth = new UsernamePasswordAuthenticationToken(principal, password, grantedAuths);
			return auth;
		} else {
			SecurityContextHolder.getContext().setAuthentication(null);
			return null;
		}
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

}