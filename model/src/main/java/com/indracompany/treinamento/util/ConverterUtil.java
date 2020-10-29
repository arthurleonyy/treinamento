package com.indracompany.treinamento.util;

import java.io.Serializable;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import javax.swing.text.MaskFormatter;

public class ConverterUtil implements Serializable {
    private static final long serialVersionUID = -3544745499910467788L;

    public static long converteDataParaMeses(LocalDate dataNascimento) {
        LocalDate today = LocalDate.now();
        long mesesEntreDatas = ChronoUnit.MONTHS.between(dataNascimento.withDayOfMonth(1), today.withDayOfMonth(1));
        return mesesEntreDatas;
    }

    public static Integer parseIntegerWrapper(Object object) {
        Integer value = null;
        if (object != null) {
            if (object instanceof Integer) {
                return (Integer) object;
            } else {
                return parseIntegerWrapper(object.toString());
            }
        }
        return value;
    }

    public static Integer parseIntegerWrapper(String string) {
        Integer value = null;
        if (string != null && !string.isEmpty()) {
            try {
                value = Integer.valueOf(string);
            } catch (Exception e) {
            }
        }
        return value;
    }

    public static int parseInteger(String string) {
        int value = 0;
        if (string != null && !string.isEmpty()) {
            try {
                Integer integerValue = Integer.valueOf(string);
                value = (integerValue != null) ? integerValue.intValue() : 0;
            } catch (Exception e) {
            }
        }
        return value;
    }
    
    public static String convertCpfSemMascara(String cpf) {
        if(cpf != null && cpf.length() == 11) {
            try {
                MaskFormatter mf = new MaskFormatter("###.###.###-##");
                mf.setValueContainsLiteralCharacters(false);
                return mf.valueToString(cpf);
            }catch(Exception e) {
            }
        }
        
        return cpf;
    }

    public static String formatarMoeda(BigDecimal valor) {
        if (valor == null) {
            return "0,00";
        }

        DecimalFormat decimalFormat = new DecimalFormat("#,##0.00");
        return decimalFormat.format(valor.doubleValue());
    }

}