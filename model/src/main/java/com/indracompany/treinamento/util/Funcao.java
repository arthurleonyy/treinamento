package com.indracompany.treinamento.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Funcao {
	public static String localDateTimeToStrDate(LocalDateTime data) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        String dataFormatada = data.format(formatter);
		
		return dataFormatada;
	}
	
	public static String localDateTimeToStrTime(LocalDateTime data) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");

        String horaFormatada = data.format(formatter);
		
		return horaFormatada;
	}
}
