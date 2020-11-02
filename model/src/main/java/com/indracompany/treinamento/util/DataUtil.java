package com.indracompany.treinamento.util;
/**
 * @author rhamon
 */
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DataUtil {

	public static String formatarData(LocalDateTime data) {
		DateTimeFormatter formatar = DateTimeFormatter.ofPattern("dd/MM/yyyy");

		String dataFormatada = data.format(formatar);

		return dataFormatada;
	}

}
