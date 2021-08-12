**SOBRE O QUE É O PROJETO?**
========================================================================
O objetivo do projeto é servir de base para o treinamento de "Formação Java/Angular para novos profissionais", da Indra, unidade de João Pessoa, 
ministrado por Eder Ferreira (efmendes@indracompany.com) e Arthur Leony (aldantas@indracompany.com)


**Conteúdo do Treinamento - Back-End**

- Git
- Lombok 
- Criando um projeto Spring 
- Maven 
- Spring Boot 
- Api (Rest)
- Swagger 
- JPA (Hibernate) 
- Spring Data 
- MySQL

**Conteúdo do Treinamento - Front-End**

- Introdução ao Angular;
- Introdução ao Typescript;
- Arquitetura de um projeto Angular;
- Componentes com Angular;
- Rotas de Navegação;
- Módulos e Carregá-los de Forma Tardia (Lazy-Loading);
- Text interpolation;
- Property binding;
- Diretivas e Pipes;
- Formulários com Reactive Forms;
- Validadores Padrões e Personalizados para Formulários;
- Operadores de RxJS;
- Consumo de Web Services REST usando os serviços Http e HttpClient;
- HttpInterceptors para exibição de erros.


**COMO CONSTRUIR O AMBIENTE**
========================================================================


**Back-End**

	Baixar e instalar o Lombok na sua IDE em https://projectlombok.org/download.
	Acessar o diretório onde o lombok.jar foi baixado e executar no terminal: java -jar lombok.jar.
	Na janela de instalação, especificar o caminho onde se encontra sua IDE e concluir a instalação.

	Caso não consiga instalar através da interface, copiar o lombok.jar para o diretório do eclipse e editar o arquivo eclipse.ini e incluir a linha abaixo no final do arquivo:

	-javaagent:/DIRETÓRIO_QUE_VOCE_COPIOU_O_LOMBOK.JAR/lombok.jar

	Primeiramente deve-se clonar o repositório no endereço:
	
	https://github.com/efmendes/treinamento_2020101.git
	
	Após o projeto ser clonado, abra o terminal no diretório clonado **treinamento**
	e utilize os seguintes comandos:

	mvn install
	../treinamento-controller/target
	java -jar treinamento.war

	Para acesso à sua API desenvolvida, utilize o endereço: http://localhost:8080/treinamento



**Front-End**

	Para começar a instalar o Angular, a primeira coisa que precisamos é o conjunto `Node.js` e o seu gestor de pacotes, o `npm`.

	Para verificar se temos estes requisitos instalados execute o comando abaixo.

	`$ node -v` <br/>
	`$ npm -v`

	Caso algum destes não esteja instalado, tente fazer a instalação novamente para poder proseguir.

	Com o node já instalado, instale o CLI Angular globalmente, para instalar o CLI usando npm, abra uma janela do terminal / console e digite o seguinte comando:

	`npm install @angular/cli -g`

	Para verificar se temos o @angular/cli instalado execute o comando abaixo.

	`ng version`
	
	Agora que estamos prontos, entre no diretório `/view` e execute `ng serve` para subir a aplicação para um servidor de desenvolvimento. Navegue até `http: // localhost: 4200 /`. O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.

	Para obter mais ajuda sobre o Angular CLI, use `ng help` ou verifique o [Angular CLI README] (https://github.com/angular/angular-cli/blob/master/README.md).
	
**É de suma importância aguardar a execução dos comandos acima citados.**

========================================================================


Voce pode desenvolver utilizando os recursos abaixo:
========================================================================
- Java 11
- Maven

Banco de dados
========================================================================

Como acessar o client do MySQL:

	
	JDBC URL: jdbc:mysql://localhost:3306/treinamentoindra
    Usuário: root
	Senha: vertrigo
