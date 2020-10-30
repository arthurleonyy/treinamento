package com.indracompany.treinamento.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen")
@Configuration
public class SwaggerDocumentationConfig {

  ApiInfo apiInfo() {
    return new ApiInfoBuilder().title("Sistema Bancário Simplificado com Spring Boot").description("Sistema simplicado que realiza o gerenciamento de bancos e principais operações")
    		 .contact(new Contact("Robson jr", null, null))
         .license("Apache 2.0")
         .licenseUrl("http://www.apache.org/licenses/LICENSE-2.0.html")
        .build();
  }

  @Bean
  public Docket customImplementation() {
    return new Docket(DocumentationType.SWAGGER_2).select()
        // .apis(RequestHandlerSelectors.basePackage("com.indracompany.treinamento"))
        .apis(RequestHandlerSelectors.any()).paths(PathSelectors.any()).build().directModelSubstitute(org.threeten.bp.LocalDate.class, java.sql.Date.class)
        .directModelSubstitute(org.threeten.bp.OffsetDateTime.class, java.util.Date.class).apiInfo(this.apiInfo());
  }

}
