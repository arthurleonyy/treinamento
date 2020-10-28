package com.indracompany.treinamento.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class FormatarData {

	public static String dataAtualFormatada() {
		
		SimpleDateFormat formatador = new SimpleDateFormat("dd/MM/yyyy'T'HH:mm:ss Z", Locale.getDefault()); 
        String novaData = formatador.format(new Date()); 
        
        return novaData;
	}
}
