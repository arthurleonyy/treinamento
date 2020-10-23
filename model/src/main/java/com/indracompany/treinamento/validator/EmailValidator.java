package com.indracompany.treinamento.validator;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

import org.springframework.stereotype.Component;


@Component(value = "emailValidator")
@FacesValidator
public class EmailValidator implements Validator {

    public static final String EMAIL_INVALIDO = "Email é inválido.";

    public static boolean isValidoEmail(String email) {
	boolean isEmailValido = false;
	if (email != null && email.length() > 0) {
	    String expression = ".+@.+\\.[a-z]+";
	    Pattern pattern = Pattern.compile(expression, Pattern.CASE_INSENSITIVE);
	    Matcher mt = pattern.matcher(email);
	    if (mt.matches()) {
		isEmailValido = true;
	    }
	}
	return isEmailValido;
    }

    @Override
    public void validate(final FacesContext arg0, final UIComponent arg1, Object valor) {
	if (!isValidoEmail(String.valueOf(valor))) {
	    final FacesMessage message = new FacesMessage();
	    message.setSeverity(FacesMessage.SEVERITY_ERROR);
	    message.setSummary(EmailValidator.EMAIL_INVALIDO);
	    throw new ValidatorException(message);
	}
    }
}
