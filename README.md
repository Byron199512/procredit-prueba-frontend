# CreditosApp

El proyecto fue generado con la version 15.2.6.
# __BACKEND__
1. Descargar el proyecto de github
2. Configurar las variables de entorno en el archivo  __appsettings.Development.json__
    ```javascript
     "Jwt": {
    "Key": "palabraSecreta",
    "Issuer": "https://localhost:4200",
    "Audience": "https://localhost:4200" }
    ```
    ```javascript
    "connectionStrings": {
    "defaultConnection": "Conexion SQL SERVER"}
    ```
3. Crear Migracion de la base de datos
    ```
    Add-Migration nombre_migracion
    ```
4. Actualizar la base de datos
    ```
    Update-Database
    ```
5. Correr la aplicacion y probar la api
# __FRONTEND__
## Levantar el proyecto en modo desarrollo

1. Descargar el proyecto de github

2. Instalar las dependencias del proyecto 
    ``` 
    npm i 
    ```
3. En el archivo ./enviroments/environment.ts  poner la url de la api ejm:
      ```
      http://localhost:5289/api
      ``` 
4. Correr el comando 
    ``` 
      ng serve -o
    ```
# Configurar datos del proyecto
1. Insertar datos de prueba para probar la aplicacion
    ```
    http://localhost:5289/api/seed
    ```
# Probar la aplicacion
1. Abrir la url del proyecto http://localhost:4200/
2. Probar insertar solicitud
    ```
    http://localhost:4200/home
    ```
3. Crear asesor de prueba 
    ```
    http://localhost:4200/auth/register
    ```
4. Ingresar como asesor
    ```
    http://localhost:4200/auth/login
    ```
5. Listar solicitudes de cada asesor
    ```
    http://localhost:4200/advisor/list
    ```

