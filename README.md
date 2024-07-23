# API Key Manager -G4 Primer HAckaton ONE

## Descripción

El **API Key Manager** es una aplicación web que permite gestionar de manera segura y eficiente las API keys utilizadas
en diversos servicios, especialmente en proyectos de inteligencia artificial. La aplicación ofrece funcionalidades para
almacenar, categorizar, y monitorear las keys, así como registrar su uso y notificar sobre su expiración.

## Tecnologías Utilizadas

- **Backend**: Spring Boot
- **Frontend**: Next.js
- **Base de Datos**: PostgreSQL

## Características

- Almacenamiento seguro de API keys.
- Categorización y búsqueda de keys.
- Registro de uso de las keys.
- Notificaciones de expiración de keys.
- Acceso basado en roles.
- API RESTful para integraciones.

## Instalación

### Backend
- Descargar Keycloak desde la página oficial y descomprimir el archivo.

#### Configuracion Keycloak
URL: https://github.com/keycloak/keycloak/releases/download/25.0.2/keycloak-25.0.2.zip

#### Configuracion CMD:
Abrir la ventana de comandos en la "RUTA BASE DE KEYCLOAK" y ejecutar el siguiente comando,
reemplazando con los datos del usario:

- ```bin\kc.bat import --dir <ruta_al_directorio>```

La ruta al directorio es la ubicación de la carpeta ConfigKey en el repositorio del proyecto en la carpeta BackEnd.
- Ejemplo "de ruta de directorio": ```C:\Users\<username>\<download>\<G4_HAckaton_1_ONE>\BackEnd\ConfigKey```

- Ejemplo de ruta completa: ``` bin\kc.bat import --dir C:\Users\<username>\Documents\<G4_HAckaton_1_ONE>\BackEnd\ConfigKey```
- Posteriormente, ejecutar este comando: ``` bin\kc.bat start-dev``` para iniciar el servidor de keycloak.
#### Posibles errores de ejecucion
Dada la posibilidad de algún fallo en la ejecución, escribir el siguiente comando en la terminal:

``` bin\kc.bat start --verbose```

##### Credenciales por default 
- Usuario: admin
- Contraseña: admin

### Prerrequisitos

- Java 11+
- Keycloak
- Node.js 14+
- PostgreSQL

# Funciones:

Frontend Developer 1: Diseño de la interfaz de usuario y maquetación.

Frontend Developer 2: Implementación de la lógica de manejo de estado y validación de formularios.

Frontend Developer 3: Integración con la API backend y manejo de peticiones HTTP.Equipo Backend:

Backend Developer 1: Implementación de los modelos y la base de datos.

Backend Developer 2: Desarrollo de los controladores y lógica de negocio.

Backend Developer 3: Implementación de las rutas y la autenticación de usuarios.

## Asignaciones:

Wilson Osorio BackEnd 0303_ep - Back 3

Erick Conquera BackEnd crewald7 GUATEMALA - Back 1 - AUSENTE

Jair Chávez Islas BackEnd Jair0305 MÉXICO - Back 2

Miguel Evangelista FrontEnd miguel_aeb REP DOMINICANA - Front 1

Camila Alexandra Arias Ruiz FrontEnd camileja COLOMBIA - Front 3

Juan Camilo Murcia Ledesma FrontEnd JuanCamiloMurcia COLOMBIA - Front 2
