package com.indracompany.treinamento.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

import com.indracompany.treinamento.util.security.CustomAuthenticationProvider;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(jsr250Enabled = true, prePostEnabled = true)
public class BasicSecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	
	@Autowired
	private CustomAuthenticationProvider authProvider;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http
			.httpBasic()
			.and()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		http.
			authorizeRequests().antMatchers("/", "/public/**","/login*","/swagger-ui.html*", "/webjars/**","/v2/**").permitAll()
			//.authorizeRequests().antMatchers("/**").permitAll();
			.and()
			.authorizeRequests().antMatchers("/rest/**").authenticated();

		http
			.logout()
			.logoutUrl("/rest/autenticacao/logout")
			.invalidateHttpSession(true)
			.deleteCookies("JSESSIONID")
			.permitAll();

		http
			.csrf()
			.disable();

		http
			.cors();
	}
	
	
	
	@Autowired
	public void configAuthentication(AuthenticationManagerBuilder auth) {
		auth.authenticationProvider(authProvider);
	}
}