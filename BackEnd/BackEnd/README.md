# Backend

This project was generated with Spring Boot at Spring Initializr with some dependencies added from other sites.

## Table of Contents

- [Requirements](#requirements)
- [Development server](#development-server)
- [Api Documentation (open api)](#open-api)
- [Environment Configuration](#environment-configuration)
    - [Environment Variables](#environment-variables)
    - [application.properties File](#applicationproperties-file)
- [Business Logic](#business-logic)
- [Database Structure](#database-structure)


## Requirements

- Java 17
- Maven 4.0.0
- Spring Boot 3.2.4
- MySQL

## Development server

Run `mvn spring-boot:run` for a dev server. Navigate to `http://localhost:8080/`. The app will automatically reload if you change any of the source files.

## Open API

Before execute the app, navigate to `http://localhost:8080/swagger-ui.html` to see the API documentation.

## Environment Configuration

### Environment Variables

The following environment variables must be set at the .env file in the root directory:

- `DB_USERNAME`: Description needed.
- `DB_PASSWORD`: Description needed.

### application.properties File

The `application.properties` file must be created in the `src/main/resources` directory with the following content:

```properties
spring.application.name=BackEnd
server.port=9090
# Configuracion Swagger
swagger.role.admin = admin

# Configuración de JPA y Hibernate
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.datasource.url=jdbc:postgresql://localhost:5432/key_manager
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
#spring.jpa.properties.hibernate.format_sql=true

# Enable SQL logging
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE

swagger.description.keycloud = This controller allows registration, editing, creation, updating, etc
#Keycloak config
keycloak.url.token = http://localhost:8080/realms/spring-boot_realm/protocol/openid-connect/token
spring.security.oauth2.resourceserver.jwt.issuer-uri=http://localhost:8080/realms/spring-boot_realm
spring.security.oauth2.resourceserver.jwt.jwk-set-uri=http://localhost:8080/realms/spring-boot_realm/protocol/openid-connect/certs

keycloak.server-url=http://localhost:8080
keycloak.realm-name=spring-boot_realm
keycloak.realm-master=master
keycloak.admin-cli=admin-cli
keycloak.user-console=admin
keycloak.password-console=admin
keycloak.client-secret=qAe5OVGjlvPmQiSRCCnwY54mYGT01KF8

jwt.attribute = preferred_username
keycloak.idResource = spring-boot-client

# Configuración de pool de conexiones
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=2
spring.datasource.hikari.idle-timeout=30000
spring.datasource.hikari.max-lifetime=1800000
spring.datasource.hikari.connection-timeout=30000

```
## Business Logic

For knowing more about Business Rules and Business logic, please check the [Business Logic](docs/BUSINESS_LOGIC.md) file.

## Database Structure

The database file is located in the `src/main/resources` directory.\
is a single file that contains the database structure and some data needed for the initial setup.\
in this project at the moment is not implemented a database migration tool, so you have to create the database manually.\
and update the database code in case of any changes in the database structure.\
If you want, you can use the database migration tool like Flyway or Liquibase.\

For knowing more about database structure, please check the [Database Structure](docs/DATABASE_STRUCTURE.md) file.
