package com.indracompany.treinamento.controller.validator;



import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

import org.springframework.stereotype.Component;

<<<<<<< HEAD
import com.indracompany.treinamento.util.CpfUtils;
=======
import com.indracompany.treinamento.util.CpfUtil;
>>>>>>> ce065ff95afefa915c983dc6ce34288838b1b36f

@Component(value = "cpfValidator")
@FacesValidator
public class CpfValidator implements Validator {

  public static final String CPF_INVALIDO = "CPF é inválido.";

  public static boolean isValid(String cpf) {
    cpf = remove(String.valueOf(cpf));
<<<<<<< HEAD
    return CpfUtils.validaCPF(cpf);
=======
    return CpfUtil.validaCPF(cpf);
>>>>>>> ce065ff95afefa915c983dc6ce34288838b1b36f
  }

  private static String remove(String cpf) {
    cpf = cpf.replace(".", "");
    cpf = cpf.replace("-", "");
    return cpf;
  }

  

  @Override
  public void validate(final FacesContext arg0, final UIComponent arg1, Object valorTela) {
    valorTela = remove(String.valueOf(valorTela));
<<<<<<< HEAD
    if (!CpfUtils.validaCPF(String.valueOf(valorTela))) {
=======
    if (!CpfUtil.validaCPF(String.valueOf(valorTela))) {
>>>>>>> ce065ff95afefa915c983dc6ce34288838b1b36f
      final FacesMessage message = new FacesMessage();
      message.setSeverity(FacesMessage.SEVERITY_ERROR);
      message.setSummary(CpfValidator.CPF_INVALIDO);
      throw new ValidatorException(message);
    }
  }

}
