# INVENTARIO TREDA

#### _Prueba técnica de ingreso 2024_

El siguiente es un manual explicativo para probar el funcionamiento del servicio web. Se divide en dos partes

- Funcionamiento en Producción (Render)
- Funcionamiento en local

## Funcionamiento en producción

Para poder probar el servicio en producción se debe ingresar a la [Documentación de Swagger][doc1] y seguir los siguientes pasos:

1. Buscar y ejecutar el siguiente endpoint:
   > `POST /api/auth/login` usando el siguiente body:

```sh
{
  "emailUsu": "admin1@gmail.com",
  "passUsu": "hola1234"
}

Este es un usuario administrador creado en el sistema que posee todos los permisos
```

2. Al ejecutar el endpoint anterior, debe generarse un token el cual debe ser copiado.
3. Se debe dar clic en el botón "Authorize" que aparece al principio de la documentación, a lo cual se mostrará una caja de texto en donde debemos pegar el token generado en el paso anterior.
4. Seguido, se da nuevamente clic a otro botón también llamado "Authorize" y luego cerrar.

Con lo anterior realizado, los demás endpoints que aparecen en la documentación se habilitarán para ser usados sin restricción.

## Funcionamiento en local

Para poder probar el servicio en local se debe seguir los siguientes pasos:

1. Se debe importar el archivo la colección en Postman.
2. Se debe ejecutar el archivo del script de la base de datos en MySQL.
3. Se debe instalar la imagen de docker localmente. Despues de instalado se debe ejecutar el siguiente comando:

```sh
docker run -e DB_HOST="host.docker.internal" -e DB_USER="root" -e DB_PASS="hola1234" -e DB_NAME="inventario_treda" -e JWT_SECRET="treda" -e PORT="3000" -p 3000:3000 78954/inventario_treda:latest
```

4. Buscar y ejecutar el siguiente endpoint en Postman:
   > `POST /api/auth/register` usando el siguiente body:

```sh
{
  "nomUsu": "admin1"
  "emailUsu": "admin1@gmail.com",
  "passUsu": "hola1234",
  "rolUsu": "ADMIN"
}
```

5. Buscar y ejecutar el siguiente endpoint en Postman:
   > `POST /api/auth/login` usando el siguiente body:

```sh
{
  "emailUsu": "admin1@gmail.com",
  "passUsu": "hola1234"
}
```

Al ejecutar este ultimo paso, se obtendrá el token necesario para usarlo en todos los endpoints en Postman. Se debe usar como Bearer Token Authorization.

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[doc1]: https://inventario-treda-ikicamilo.onrender.com/api/v1/docs/#/
